import app from '../../src/app';
import request from 'supertest';
import { DatabaseBootstrap } from '../../src/bootstrap/database.bootstrap';
import path from 'path';

const databaseBootstrap = new DatabaseBootstrap();

const tokenExpired =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiU2VyZ2lvIiwicGhvdG8iOiIxNjIxNjk5NDg2MjU5LnBuZyIsInJvbGVzIjpbIkFETUlOIiwiT1BFUkFUT1IiLCJNRURJQyJdLCJpYXQiOjE2MjE3MDAwODUsImV4cCI6MTYyMTcwMDE0NX0.mWNKOYdmFsWd_C7GqWU7Bhlj2A7b-2Z5CAySOot2v6E';

const tokenValid =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiU2VyZ2lvIiwicGhvdG8iOiIxNjIyODk1NDMzMTE1LmpwZyIsInJvbGVzIjpbIkFETUlOIiwiT1BFUkFET1IiLCJNw4lESUNPIl0sImlhdCI6MTYyMjkyMDI4OCwiZXhwIjoxOTM4MjgwMjg4fQ.dvOZwg96uyHjd7rKJpe26DBI-lwYfeNELUH1zKI_Zfs';

const TIMEOUT = 24 * 60 * 60 * 1000;
const numberRandom = Math.round(Math.random() * 1000000 + 1);

describe('user.route.ts', () => {
  beforeAll(async () => {
    await databaseBootstrap.initialize();
  });

  afterAll(async () => {
    const connection = databaseBootstrap.getConnection();
    connection.close();
  });

  it('get / without token', async () => {
    const response: any = await request(app).get('/users');

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('User is not authenticated');
  });

  it('get / with token expired', async () => {
    const response: any = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${tokenExpired}`);

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe('El token ha expirado');
  });

  it(
    'get / with token valid',
    async () => {
      const response: any = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${tokenValid}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('trace');
      expect(response.body).toHaveProperty('payload');
      expect(response.body).toHaveProperty('payload.data');
      expect(response.body.payload.data.length).toBeGreaterThanOrEqual(1);
      expect(response.body.payload.data[0]).toHaveProperty('id');
      expect(response.body.payload.data[0]).toHaveProperty('name');
      expect(response.body.payload.data[0]).toHaveProperty('email');
      expect(response.body.payload.data[0]).toHaveProperty('password');
      expect(response.body.payload.data[0]).toHaveProperty('refreshToken');
      expect(response.body.payload.data[0]).toHaveProperty('photo');
    },
    TIMEOUT
  );

  it(
    'post /users',
    async () => {
      const response: any = await request(app)
        .post('/users')
        .field('name', 'username-' + numberRandom)
        .field('email', numberRandom + '@user.com')
        .field('password', numberRandom)
        .field('roles', 1)
        .field('roles', 2)
        .attach('photo', path.join(__dirname, '../', '/mocks/medico.jpg'))
        .set('Authorization', `Bearer ${tokenValid}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('trace');
      expect(response.body).toHaveProperty('payload');
      expect(response.body).toHaveProperty('payload.data');
      expect(response.body.payload.data).toHaveProperty('id');
      expect(response.body.payload.data).toHaveProperty('name');
      expect(response.body.payload.data).toHaveProperty('email');
      expect(response.body.payload.data).toHaveProperty('password');
      expect(response.body.payload.data).toHaveProperty('refreshToken');
      expect(response.body.payload.data).toHaveProperty('roles');
      expect(response.body.payload.data.roles.length).toBeGreaterThanOrEqual(1);
      expect(response.body.payload.data).toHaveProperty('photo');
    },
    TIMEOUT
  );

  it(
    'post /users',
    async () => {
      const response: any = await request(app)
        .post('/users')
        .field('name', 'username-' + numberRandom)
        .field('email', numberRandom + '@user.com')
        .field('password', numberRandom)
        .field('roles', 1)
        .field('roles', 2)
        .set('Authorization', `Bearer ${tokenValid}`);

      expect(response.statusCode).toBe(411);
      expect(response.body.message).toBe('Error in parameters');
    },
    TIMEOUT
  );
});
