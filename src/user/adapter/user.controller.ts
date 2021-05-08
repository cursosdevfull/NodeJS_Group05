import { NextFunction, Request, Response } from 'express';
import { UserUseCase } from '../application/user.usecase';
import { UserModel } from '../domain/user.model';
import { UserOperation } from '../infraestructure/user.operation';

const operation = new UserOperation();
const useCase = new UserUseCase(operation);
export class UserController {
  list(req: Request, res: Response) {
    const result = useCase.list();
    res.json(result);
  }

  listOne(req: Request, res: Response) {
    const params = req.params;
    const id = +params.id;
    const user: Partial<UserModel> = { id };
    const result = useCase.listOne(user);
    res.json(result);
  }

  listByPage(req: Request, res: Response) {
    const params = req.params;
    const page = +params.page;
    const result = useCase.listByPage(page);
    res.json(result);
  }

  async insert(req: Request, res: Response): Promise<any> {
    const body = req.body;
    const user: Partial<UserModel> = {
      name: body.name,
      email: body.email,
      photo: body.photo,
      password: body.password,
    };
    const result = useCase.insert(user);
    res.json(result);
  }

  update(req: Request, res: Response) {
    const params = req.params;
    const body = req.body;

    const user: Partial<UserModel> = body;
    user.id = +params.id;

    const result = useCase.update(user);
    res.json(result);
  }

  remove(req: Request, res: Response) {
    const params = req.params;
    const id = +params.id;
    const user: Partial<UserModel> = { id };
    const result = useCase.remove(user);
    res.json(result);
  }
}
