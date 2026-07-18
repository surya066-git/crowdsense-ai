import { jest } from '@jest/globals';

jest.unstable_mockModule('../../services/simulation.service.js', () => ({
  processSimulationEvent: jest.fn(),
}));

const simulationService = await import('../../services/simulation.service.js');
const { triggerEvent, resetSimulation } = await import('../../controllers/simulation.controller.js');

describe('Simulation Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        type: 'TEST_EVENT',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('triggerEvent should process simulation event', async () => {
    const mockData = { processed: true };
    simulationService.processSimulationEvent.mockResolvedValue(mockData);

    await triggerEvent(req, res, next);

    expect(simulationService.processSimulationEvent).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, processed: true });
  });

  it('resetSimulation should reset simulation state', async () => {
    const mockData = { reset: true };
    simulationService.processSimulationEvent.mockResolvedValue(mockData);

    await resetSimulation(req, res, next);

    expect(simulationService.processSimulationEvent).toHaveBeenCalledWith({ type: 'RESET' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, reset: true });
  });
});
