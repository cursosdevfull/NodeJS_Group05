import app from './app';
import { ServerBootstrap } from './bootstrap/server.bootstrap';
import {
  DatabaseBootstrap,
  IDatabaseBootstrap,
} from './bootstrap/database.bootstrap';
import { RedisBootstrap } from './bootstrap/redis.bootstrap';

(async () => {
  const serverBootstrap = new ServerBootstrap(app);
  const databaseBootstrap: IDatabaseBootstrap = new DatabaseBootstrap();
  const redisBootstrap: RedisBootstrap = new RedisBootstrap();

  try {
    await serverBootstrap.initialize();
    await databaseBootstrap.initialize();
    await redisBootstrap.initialize();
  } catch (err) {
    console.log(err);
  }
})();
