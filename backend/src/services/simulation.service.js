import { updateSimulationState, addIncident, resetSimulationState, getGatesData, getWeatherData } from './map.service.js';
import { logger } from '../utils/logger.js';

export const processSimulationEvent = async (eventPayload) => {
  const { type, action, target } = eventPayload;
  
  logger.info(`Simulation Event Triggered: [${type}] - Action: ${action}`);

  if (type === 'RESET') {
    resetSimulationState();
    return { message: 'Simulation reset to baseline.' };
  }

  const gates = await getGatesData();
  const weather = await getWeatherData();

  switch (type) {
    case 'GATE':
      const gateIndex = gates.findIndex(g => g.id === target);
      if (gateIndex !== -1) {
        if (action === 'CLOSE') {
          gates[gateIndex].status = 'CLOSED';
          gates[gateIndex].currentCrowd = 0;
          gates[gateIndex].queueLength = 0;
        } else if (action === 'OPEN') {
          gates[gateIndex].status = 'OPEN';
        }
        updateSimulationState({ gates });
      }
      break;

    case 'CROWD':
      if (action === 'INCREASE') {
        gates.forEach(g => {
          if (g.status === 'OPEN') {
            g.currentCrowd = Math.min(g.capacity, g.currentCrowd + 1000);
            g.queueLength += 15;
          }
        });
      } else if (action === 'DECREASE') {
        gates.forEach(g => {
          if (g.status === 'OPEN') {
            g.currentCrowd = Math.max(0, g.currentCrowd - 1000);
            g.queueLength = Math.max(0, g.queueLength - 15);
          }
        });
      }
      updateSimulationState({ gates });
      break;

    case 'INCIDENT':
      // Target could be a specific gate ID, or fallback to gate_a for demo
      const affectedGateId = target || 'gate_a';
      const gateInfo = gates.find(g => g.id === affectedGateId) || gates[0];
      
      const newIncident = {
        type: action === 'MEDICAL' ? 'Medical Emergency' : action === 'SECURITY' ? 'Security Alert' : 'Fire Alert',
        severity: action === 'FIRE' ? 'CRITICAL' : 'HIGH',
        affectedGate: affectedGateId,
        lat: gateInfo.lat + 0.0001, // Slightly offset from gate
        lng: gateInfo.lng + 0.0001
      };
      addIncident(newIncident);
      break;

    case 'WEATHER':
      if (action === 'STORM') {
        updateSimulationState({ weather: { ...weather, rain: '100%', wind: '45 mph', warning: 'SEVERE STORM' } });
      } else if (action === 'RAIN') {
        updateSimulationState({ weather: { ...weather, rain: '70%', wind: '15 mph' } });
      }
      break;

    default:
      throw new Error('Unknown simulation event type');
  }

  // Record event to firestore (fire and forget for now, or just return success)
  return { message: `Successfully simulated ${action} for ${type}` };
};
