import { triggerSimulationEvent, resetSimulation } from './simulationService';
import { apiClient } from './apiClient';

vi.mock('./apiClient', () => ({ apiClient: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() } }));

describe('simulationService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('triggerSimulationEvent should call /simulation/event', async () => {
    const mockData = { data: { success: true } };
    apiClient.post.mockResolvedValue(mockData);

    const result = await triggerSimulationEvent('inc', 'create', 'gate_a');

    expect(apiClient.post).toHaveBeenCalledWith('/simulation/event', {
      type: 'inc',
      action: 'create',
      target: 'gate_a',
    });
    expect(result).toEqual(mockData.data);
  });

  it('triggerSimulationEvent should work without target', async () => {
    const mockData = { data: { success: true } };
    apiClient.post.mockResolvedValue(mockData);

    const result = await triggerSimulationEvent('inc', 'create');

    expect(apiClient.post).toHaveBeenCalledWith('/simulation/event', {
      type: 'inc',
      action: 'create',
      target: null,
    });
    expect(result).toEqual(mockData.data);
  });

  it('resetSimulation should call /simulation/reset', async () => {
    const mockData = { data: { success: true } };
    apiClient.post.mockResolvedValue(mockData);

    const result = await resetSimulation();

    expect(apiClient.post).toHaveBeenCalledWith('/simulation/reset');
    expect(result).toEqual(mockData.data);
  });
});
