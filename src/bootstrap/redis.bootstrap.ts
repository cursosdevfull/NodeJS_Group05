import IORedis from 'ioredis';
import yenv from 'yenv';

const env = yenv();

let client: any = yenv;

export class RedisBootstrap {
  private client: IORedis.Redis;

  initialize() {
    return new Promise((resolve, reject) => {
      this.client = new IORedis({
        host: env.DATABASE.REDIS.HOST,
        port: env.DATABASE.REDIS.PORT,
        password: env.DATABASE.REDIS.PASSWORD,
        retryStrategy(times) {
          const delay = Math.min(times * 100, 2000);
          return delay;
        },
        maxRetriesPerRequest: 5,
      });
      /*       this.client = new IORedis(
        `redis://${env.DATABASE.REDIS.PASSWORD}@${env.DATABASE.REDIS.HOST}:${env.DATABASE.REDIS.PORT}`
      );
 */
      this.client
        .on('connect', () => {
          console.log('Connected to Redis');
          resolve(true);
        })
        .on('error', (error: any) => {
          console.log('An error ocurred: ' + JSON.stringify(error));
          reject(error);
        });

      client = this.client;
    });
  }

  getConnection() {
    return client;
  }

  static async get(key: string) {
    return await client.get(key);
  }

  static async set(key: string, value: any) {
    await client.set(key, value, 'PX', 24 * 60 * 60 * 1000);
  }

  static async clear() {
    const keys = await client.keys('*');
    const pipeline = client.pipeline();

    keys.forEach((key: any) => {
      pipeline.del(key);
    });

    return pipeline.exec();
  }
}
