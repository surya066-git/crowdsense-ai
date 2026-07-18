import request from 'supertest';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../../firebase/admin.js', () => ({
  getAuth: () => ({
    verifyIdToken: async (token) => {
      if (!token) throw new Error('No token');
      return { uid: 'test_user', roles: [] };
    }
  }),
  getFirestore: jest.fn(),
  getStorage: jest.fn(),
  hasFirebaseAdminCredentials: jest.fn(() => true),
  initializeFirebaseAdmin: jest.fn()
}));

const { default: app } = await import('../../app.js');

describe('Recommendation API Integration Tests', () => {
  const validPayload = {
    fanLocation: { lat: 37.775, lng: -122.419 },
    destinationSection: 'Section A',
    stadiumId: 'stadium_1',
  };

  test('POST /api/v1/recommendations should return 200 with valid data', async () => {
    const res = await request(app)
      .post('/api/v1/recommendations')
      .set('Authorization', 'Bearer fake_token')
      .send(validPayload);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('recommendationId');
    expect(res.body.data).toHaveProperty('bestGate');
    expect(res.body.data).toHaveProperty('explainabilityMatrix');
  });

  test('POST /api/v1/recommendations should return 400 for missing fanLocation', async () => {
    const res = await request(app)
      .post('/api/v1/recommendations')
      .set('Authorization', 'Bearer fake_token')
      .send({ destinationSection: 'Section A', stadiumId: '1' });

    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });
});
