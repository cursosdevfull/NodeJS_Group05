import app from '../../src/app';
import { ServerBootstrap } from '../../src/bootstrap/server.bootstrap';

describe('server.bootstrap.ts', () => {
  it('initialize server', async () => {
    const serverBootstrap = new ServerBootstrap(app);
    const response = await serverBootstrap.initialize();
    expect(response).toBeTruthy();
  });
});
