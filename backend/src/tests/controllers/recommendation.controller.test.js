import { jest } from '@jest/globals';

jest.unstable_mockModule('../../services/recommendation.service.js', () => ({
  processRecommendation: jest.fn(),
}));

const recommendationService = await import('../../services/recommendation.service.js');
const { getRecommendation } = await import('../../controllers/recommendation.controller.js');

describe('Recommendation Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        fanLocation: 'A',
        destinationSection: 'B',
        stadiumId: '123',
      },
      user: {
        uid: 'user1',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('getRecommendation should return recommendation data', async () => {
    const mockData = { path: ['A', 'B'] };
    recommendationService.processRecommendation.mockResolvedValue(mockData);

    await getRecommendation(req, res, next);

    expect(recommendationService.processRecommendation).toHaveBeenCalledWith('A', 'B', '123', 'user1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: mockData });
  });

  it('getRecommendation should handle missing user gracefully', async () => {
    req.user = undefined;
    const mockData = { path: ['A', 'B'] };
    recommendationService.processRecommendation.mockResolvedValue(mockData);

    await getRecommendation(req, res, next);

    expect(recommendationService.processRecommendation).toHaveBeenCalledWith('A', 'B', '123', undefined);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('getRecommendation should return 409 when ALL_GATES_CLOSED_OR_UNSAFE', async () => {
    const error = new Error('ALL_GATES_CLOSED_OR_UNSAFE');
    recommendationService.processRecommendation.mockRejectedValue(error);

    await getRecommendation(req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'No safe gates available. Please stand by for stadium announcements.',
    });
  });

  it('getRecommendation should pass other errors to next', async () => {
    const error = new Error('OTHER_ERROR');
    recommendationService.processRecommendation.mockRejectedValue(error);

    getRecommendation(req, res, next);
    
    // Wait for promise microtask queue to clear
    await new Promise(resolve => process.nextTick(resolve));

    expect(next).toHaveBeenCalledWith(error);
  });
});
