import app from '../../src/app';
import request from 'supertest';

describe('user.route.ts', () => {
  it('get / without token', async () => {
    const response: any = await request(app).get('/users');

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('User is not authenticated');
  });
});
