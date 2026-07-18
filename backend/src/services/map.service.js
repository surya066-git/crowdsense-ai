import { logger } from '../utils/logger.js';

// --- IN-MEMORY STATE ---
// We simulate a real-time database or fast Redis cache holding current stadium conditions.

const DEFAULT_GATES = [
  {
    id: 'gate_a',
    name: 'North Gate A',
    lat: 37.7749,
    lng: -122.4194,
    status: 'OPEN',
    capacity: 5000,
    currentCrowd: 1200,
    queueLength: 15,
  },
  {
    id: 'gate_b',
    name: 'East Gate B',
    lat: 37.774,
    lng: -122.418,
    status: 'OPEN',
    capacity: 3000,
    currentCrowd: 2800,
    queueLength: 45,
  },
  {
    id: 'gate_c',
    name: 'South Gate C',
    lat: 37.773,
    lng: -122.4194,
    status: 'CLOSED',
    capacity: 4000,
    currentCrowd: 0,
    queueLength: 0,
  },
  {
    id: 'gate_d',
    name: 'West Gate D',
    lat: 37.774,
    lng: -122.4208,
    status: 'OPEN',
    capacity: 6000,
    currentCrowd: 4500,
    queueLength: 30,
  },
];

const DEFAULT_INCIDENTS = [];
const DEFAULT_WEATHER = {
  temperature: 72,
  rain: '0%',
  wind: '12 mph',
  visibility: '10 miles',
  warning: null,
};
const DEFAULT_CROWD_ZONES = [
  {
    id: 'zone_1',
    level: 'LOW',
    bounds: [
      [37.7749, -122.4194],
      [37.7755, -122.4188],
      [37.7745, -122.418],
    ],
  },
  {
    id: 'zone_2',
    level: 'HIGH',
    bounds: [
      [37.774, -122.418],
      [37.7746, -122.4174],
      [37.7735, -122.4168],
    ],
  },
  {
    id: 'zone_3',
    level: 'MEDIUM',
    bounds: [
      [37.774, -122.4208],
      [37.7745, -122.4215],
      [37.7735, -122.4215],
    ],
  },
  {
    id: 'zone_4',
    level: 'VERY_HIGH',
    bounds: [
      [37.773, -122.4194],
      [37.7725, -122.4188],
      [37.772, -122.42],
    ],
  },
];

let state = {
  gates: JSON.parse(JSON.stringify(DEFAULT_GATES)),
  incidents: JSON.parse(JSON.stringify(DEFAULT_INCIDENTS)),
  weather: JSON.parse(JSON.stringify(DEFAULT_WEATHER)),
  crowdZones: JSON.parse(JSON.stringify(DEFAULT_CROWD_ZONES)),
};

// --- GETTERS ---
export const getGatesData = async () => state.gates;
export const getCrowdDensityZones = async () => state.crowdZones;
export const getIncidentsData = async () => state.incidents;
export const getWeatherData = async () => state.weather;

export const getMapConfigData = async () => {
  return {
    center: [37.774, -122.4194],
    zoom: 16,
    bounds: [
      [37.776, -122.422],
      [37.772, -122.417],
    ],
  };
};

// --- SIMULATION SETTERS ---
export const updateSimulationState = (newStateUpdates) => {
  state = { ...state, ...newStateUpdates };
};

export const addIncident = (incident) => {
  state.incidents.push({
    ...incident,
    id: `inc_${Date.now()}`,
    timestamp: new Date().toISOString(),
  });
};

export const resetSimulationState = () => {
  state = {
    gates: JSON.parse(JSON.stringify(DEFAULT_GATES)),
    incidents: JSON.parse(JSON.stringify(DEFAULT_INCIDENTS)),
    weather: JSON.parse(JSON.stringify(DEFAULT_WEATHER)),
    crowdZones: JSON.parse(JSON.stringify(DEFAULT_CROWD_ZONES)),
  };
};
