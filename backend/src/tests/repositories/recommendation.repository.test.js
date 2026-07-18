import { jest } from '@jest/globals';

jest.unstable_mockModule('../../firebase/admin.js', () => {
  const setMock = jest.fn();
  const docMock = jest.fn().mockReturnValue({ set: setMock });
  const collectionMock = jest.fn().mockReturnValue({ doc: docMock });
  
  return {
    hasFirebaseAdminCredentials: jest.fn(),
    getFirestore: jest.fn().mockReturnValue({
      collection: collectionMock
    }),
    _setMock: setMock,
  };
});

jest.unstable_mockModule('../../utils/logger.js', () => ({
  logger: {
    debug: jest.fn(),
    error: jest.fn(),
  },
}));

const adminModule = await import('../../firebase/admin.js');
const loggerModule = await import('../../utils/logger.js');
const { saveRecommendationHistory } = await import('../../repositories/recommendation.repository.js');

describe('Recommendation Repository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should skip saving if no firebase admin credentials', async () => {
    adminModule.hasFirebaseAdminCredentials.mockReturnValue(false);

    await saveRecommendationHistory({ recommendationId: '123' }, 'user1');

    expect(adminModule.hasFirebaseAdminCredentials).toHaveBeenCalled();
    expect(loggerModule.logger.debug).toHaveBeenCalledWith(
      'Skipping recommendation history save because Firebase Admin credentials are not configured.'
    );
    expect(adminModule.getFirestore).not.toHaveBeenCalled();
  });

  it('should save recommendation history', async () => {
    adminModule.hasFirebaseAdminCredentials.mockReturnValue(true);
    adminModule._setMock.mockResolvedValue();

    const recommendation = { recommendationId: '123', path: 'A-B' };
    await saveRecommendationHistory(recommendation, 'user1');

    expect(adminModule.hasFirebaseAdminCredentials).toHaveBeenCalled();
    expect(adminModule.getFirestore).toHaveBeenCalled();
    expect(adminModule._setMock).toHaveBeenCalled();
  });

  it('should save recommendation history with anonymous user', async () => {
    adminModule.hasFirebaseAdminCredentials.mockReturnValue(true);
    adminModule._setMock.mockResolvedValue();

    const recommendation = { recommendationId: '123', path: 'A-B' };
    await saveRecommendationHistory(recommendation, null);

    expect(adminModule._setMock).toHaveBeenCalledWith(expect.objectContaining({
      userId: 'anonymous'
    }));
  });

  it('should log error if saving fails', async () => {
    adminModule.hasFirebaseAdminCredentials.mockReturnValue(true);
    const error = new Error('Firestore error');
    adminModule._setMock.mockRejectedValue(error);

    await saveRecommendationHistory({ recommendationId: '123' }, 'user1');

    expect(loggerModule.logger.error).toHaveBeenCalledWith('Failed to save recommendation to Firestore: Firestore error');
  });
});
