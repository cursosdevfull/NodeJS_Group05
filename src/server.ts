import app from './app';
import { ServerBootstrap } from './bootstrap/server.bootstrap';
import {
  DatabaseBootstrap,
  IDatabaseBootstrap,
} from './bootstrap/database.bootstrap';

(async () => {
  const serverBootstrap = new ServerBootstrap(app);
  const databaseBootstrap: IDatabaseBootstrap = new DatabaseBootstrap();

  try {
    await serverBootstrap.initialize();
    await databaseBootstrap.initialize();
  } catch (err) {
    console.log(err);
  }
})();
