import { Request, Response } from 'express';
import { RedisBootstrap } from '../../bootstrap/redis.bootstrap';
import { UserUseCase } from '../application/user.usecase';
import { UserModel } from '../domain/user.model';

export class UserController {
  constructor(private useCase: UserUseCase) {}

  async list(req: Request, res: Response) {
    const result = await this.useCase.list();
    //console.log('identifier', res.locals.cacheIdentifier);
    //RedisBootstrap.set(res.locals.cacheIdentifier, JSON.stringify(result));
    res.json(result);
  }

  async listOne(req: Request, res: Response) {
    const params = req.params;
    const id = +params.id;
    const user: Partial<UserModel> = { id };
    const result = await this.useCase.listOne(user);
    res.json(result);
  }

  async listByPage(req: Request, res: Response) {
    const params = req.params;
    const page = +params.page;
    const result = await this.useCase.listByPage(page, 20);
    res.json(result);
  }

  async insert(req: Request, res: Response): Promise<any> {
    const body = req.body;
    const user: UserModel = {
      name: body.name,
      email: body.email,
      photo: body.photo,
      password: body.password,
      roles: body.roles.map((role: string) => +role),
    };
    const result = await this.useCase.insertCipher(user);
    res.json(result);
  }

  async update(req: Request, res: Response) {
    const params = req.params;
    const body = req.body;

    const user: UserModel = body;
    const id = +params.id;

    const result = await this.useCase.update(user, { id });
    res.json(result);
  }

  async remove(req: Request, res: Response) {
    const params = req.params;
    const id = +params.id;
    const result = await this.useCase.remove({ id });
    res.json(result);
  }
}
