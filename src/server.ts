import app from './app';
import { ServerBootstrap } from './bootstrap/server.bootstrap';

(async () => {
  const serverBootstrap = new ServerBootstrap(app);

  try {
    await serverBootstrap.initialize();
  } catch (err) {
    console.log(err);
  }
})();