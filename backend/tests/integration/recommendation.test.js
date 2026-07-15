import request from 'supertest';
import app from '../../src/app.js';

describe('Recommendation API Integration Tests', () => {
  const validPayload = {
    fanLocation: { lat: 37.7750, lng: -122.4190 },
    destinationSection: 'Section A',
    stadiumId: 'stadium_1'
  };

  test('POST /api/v1/recommendations should return 200 with valid data', async () => {
    const res = await request(app)
      .post('/api/v1/recommendations')
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
      .send({ destinationSection: 'Section A', stadiumId: '1' });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });
});
