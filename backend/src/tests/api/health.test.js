import request from 'supertest';
import app from '../../app.js';

describe('GET /api/v1/health', () => {
  it('returns the backend health payload', async () => {
    const response = await request(app).get('/api/v1/health').expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe('ok');
    expect(response.body.data.service).toBe('CrowdSense AI Backend');
    expect(response.body.requestId).toBeDefined();
  });
});
