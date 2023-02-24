import supertest from 'supertest';
import { mockServer } from '../helpers';

describe('PingController', () => {
  let server: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    server = await mockServer({});
  });

  it('should return 200 Ok #integration', async () => {
    expect.assertions(2);
    const result = await server.get('/v1/ping');
    expect(result.body).toMatchObject({ ok: true });
    expect(result.status).toBe(200);
  });
});
