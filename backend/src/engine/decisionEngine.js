/**
 * AI Decision Engine Core
 * Deterministic algorithm for gate recommendation.
 */

// Constants for scoring constraints
const MAX_ACCEPTABLE_QUEUE = 30; // minutes
const MAX_STADIUM_RADIUS = 1000; // meters (assumption for normalization)
const WALKING_SPEED = 1.4; // m/s (Tobler's flat terrain speed)

/**
 * Cache for distance calculations to improve performance.
 * Key: `${lat1},${lon1},${lat2},${lon2}`
 * Value: Distance in meters
 * @type {Map<string, number>}
 */
const distanceCache = new Map();

/**
 * Calculates the Haversine distance in meters between two coordinates.
 * @param {number} lat1 - Latitude of the first point
 * @param {number} lon1 - Longitude of the first point
 * @param {number} lat2 - Latitude of the second point
 * @param {number} lon2 - Longitude of the second point
 * @returns {number} Distance in meters
 */
export function getDistance(lat1, lon1, lat2, lon2) {
  const cacheKey = `${lat1},${lon1},${lat2},${lon2}`;
  if (distanceCache.has(cacheKey)) {
    return distanceCache.get(cacheKey);
  }

  const R = 6371e3; // Earth radius in meters
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLon = (lon2 - lon1) * rad;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  distanceCache.set(cacheKey, distance);
  return distance;
}

/**
 * Evaluates the impact of incidents on a given gate based on proximity and severity.
 * @param {Object} gate - The gate object to evaluate
 * @param {Array<Object>} incidents - Array of incident objects
 * @returns {{penalty: number, severity: string}} The computed penalty and highest severity
 */
export function evaluateIncidents(gate, incidents) {
  let penalty = 0;
  let severity = 'None';

  for (const inc of incidents) {
    const dist = getDistance(gate.lat, gate.lng, inc.lat, inc.lng);
    if (dist < 100) {
      // Incident within 100m affects the gate
      if (inc.severity === 'CRITICAL') return { penalty: 1000, severity: 'CRITICAL' }; // hard reject
      if (inc.severity === 'HIGH') {
        penalty = Math.max(penalty, 100);
        severity = 'HIGH';
      }
      if (inc.severity === 'MEDIUM') {
        penalty = Math.max(penalty, 50);
        severity = 'MEDIUM';
      }
      if (inc.severity === 'LOW') {
        penalty = Math.max(penalty, 20);
        severity = 'LOW';
      }
    }
  }
  return { penalty, severity };
}

/**
 * Generates the best gate recommendation based on user location and stadium conditions.
 * @param {{lat: number, lng: number}} fanLocation - The current location of the fan
 * @param {string} destination - The destination section in the stadium
 * @param {{gates: Array<Object>, incidents: Array<Object>, weather: Object}} stadiumData - The aggregated data of the stadium
 * @returns {Object} The generated recommendation with best gate, alternative gate, and scores
 */
export function generateDecision(fanLocation, destination, stadiumData) {
  const { gates, incidents, weather } = stadiumData;
  const validGates = [];

  // 1. Hard Filtering
  for (const gate of gates) {
    if (gate.status === 'CLOSED') continue;
    if (gate.currentCrowd >= gate.capacity) continue;

    const incidentCheck = evaluateIncidents(gate, incidents);
    if (incidentCheck.severity === 'CRITICAL') continue;

    validGates.push({
      ...gate,
      incidentPenalty: incidentCheck.penalty,
      incidentSeverity: incidentCheck.severity,
    });
  }

  if (validGates.length === 0) {
    return {
      error: 'ALL_GATES_CLOSED_OR_UNSAFE',
      safetyScore: 0,
      confidenceScore: 100,
    };
  }

  // 2. Score Calculation
  const scoredGates = validGates.map((gate) => {
    // Distance Score
    const distanceMeters = getDistance(fanLocation.lat, fanLocation.lng, gate.lat, gate.lng);
    const d_score = Math.min((distanceMeters / MAX_STADIUM_RADIUS) * 100, 100);

    // Crowd & Capacity Score
    let c_score = (gate.currentCrowd / gate.capacity) * 100;
    if (c_score > 80) c_score *= 1.5; // exponential penalty

    // Queue Score
    const q_score = Math.min((gate.queueLength / MAX_ACCEPTABLE_QUEUE) * 100, 100);

    // Weather Score
    let weatherBase = 0;
    if (weather) {
      if (parseFloat(weather.rain) > 0.5 || weather.rain.includes('%')) weatherBase += 20; // simplified mock check
      if (parseInt(weather.wind) > 20) weatherBase += 10;
    }
    const w_score = weatherBase * (d_score / 100);

    const i_score = gate.incidentPenalty;

    // Weighted Penalty
    const totalPenalty =
      i_score * 0.4 +
      c_score * 0.25 +
      q_score * 0.15 +
      d_score * 0.1 +
      w_score * 0.05 +
      c_score * 0.05; // using c_score as proxy for capacity exhaustion

    // Explainability mappings
    const explainability = {
      crowdImpact: c_score > 100 ? 'Severe' : c_score > 50 ? 'Moderate' : 'Low',
      distanceImpact: d_score > 50 ? 'Far' : 'Favorable',
      incidentProximity: gate.incidentSeverity,
    };

    const walkingTimeMins = Math.round((distanceMeters * 1.3) / (WALKING_SPEED * 60));

    return {
      gate,
      penalty: totalPenalty,
      walkingTimeMins,
      explainability,
    };
  });

  // 3. Ranking
  scoredGates.sort((a, b) => a.penalty - b.penalty);

  const best = scoredGates[0];
  let alternative = null;

  // 4. Alternative Gate Selection (ensure spatial difference > 50m)
  for (let i = 1; i < scoredGates.length; i++) {
    const candidate = scoredGates[i];
    const distFromBest = getDistance(
      best.gate.lat,
      best.gate.lng,
      candidate.gate.lat,
      candidate.gate.lng,
    );
    if (distFromBest > 50) {
      alternative = candidate;
      break;
    }
  }

  if (!alternative && scoredGates.length > 1) {
    alternative = scoredGates[1]; // fallback if all are clustered
  }

  // Build JSON Response
  const safetyScore = Math.max(100 - best.penalty / 2, 0).toFixed(1);
  const confidenceScore = weather ? 95 : 80;

  return {
    recommendationId: `rec-${Date.now()}`,
    timestamp: new Date().toISOString(),
    bestGate: {
      gateId: best.gate.id,
      gateName: best.gate.name,
      walkingTimeMins: best.walkingTimeMins,
      waitingTimeMins: best.gate.queueLength,
    },
    alternativeGate: alternative
      ? {
          gateId: alternative.gate.id,
          gateName: alternative.gate.name,
          walkingTimeMins: alternative.walkingTimeMins,
          waitingTimeMins: alternative.gate.queueLength,
        }
      : null,
    safetyScore: Number(safetyScore),
    confidenceScore,
    explainabilityMatrix: {
      [best.gate.id]: best.explainability,
      ...(alternative ? { [alternative.gate.id]: alternative.explainability } : {}),
    },
  };
}
