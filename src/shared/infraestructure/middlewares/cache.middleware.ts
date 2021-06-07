import { NextFunction, Response, Request } from 'express';
import { RedisBootstrap } from '../../../bootstrap/redis.bootstrap';

export class CacheRedis {
  static handle(tagName: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let identifier = tagName;

      if (req.query) {
        for (const prop in req.query) {
          identifier += '_' + req.query[prop];
        }
      }

      if (req.params) {
        for (const prop in req.params) {
          identifier += '_' + req.params[prop];
        }
      }

      if (req.body) {
        for (const prop in req.body) {
          identifier += '_' + req.body[prop];
        }
      }

      const results = await RedisBootstrap.get(identifier);

      if (results) {
        res.json(JSON.parse(results));
      } else {
        res.locals.cacheIdentifier = identifier;
        return next();
      }
    };
  }
}
