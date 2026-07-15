/**
 * Generates a deterministic explanation if the Gemini API is unavailable.
 * Ensures the application is 100% resilient.
 */
export const getFallbackExplanation = (recommendationData) => {
  const { bestGate, alternativeGate, safetyScore } = recommendationData;
  const bestId = bestGate.gateId;
  const factors = recommendationData.explainabilityMatrix[bestId] || {};

  let explanation = `We recommend ${bestGate.gateName} based on real-time stadium data. `;
  
  if (factors.crowdImpact) {
    explanation += `The crowd density at this gate is currently ${factors.crowdImpact.toLowerCase()}. `;
  }
  
  if (factors.incidentProximity && factors.incidentProximity !== 'None') {
    explanation += `Please be aware of a ${factors.incidentProximity.toLowerCase()} severity incident nearby, but it remains the safest route. `;
  } else {
    explanation += `There are no major incidents blocking this route. `;
  }

  let alternativeText = 'No viable alternative gates are currently available.';
  if (alternativeGate) {
    alternativeText = `If ${bestGate.gateName} becomes blocked, your best alternative is ${alternativeGate.gateName}.`;
  }

  let riskLevel = 'LOW';
  if (safetyScore < 60) riskLevel = 'HIGH';
  else if (safetyScore < 85) riskLevel = 'MEDIUM';

  return {
    summary: `Head to ${bestGate.gateName} for an estimated ${bestGate.walkingTimeMins}-minute walk and ${bestGate.waitingTimeMins}-minute wait.`,
    explanation: explanation.trim(),
    alternative: alternativeText,
    safetyTips: [
      "Follow stadium staff instructions at all times.",
      "Keep your digital ticket ready before reaching the queue."
    ],
    riskLevel
  };
};
