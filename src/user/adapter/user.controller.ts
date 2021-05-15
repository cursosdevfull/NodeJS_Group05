import { Request, Response } from 'express';
import { RoleOperation } from '../../role/infraestructure/role.operation';
import { UserUseCase } from '../application/user.usecase';
import { UserModel } from '../domain/user.model';
import { UserOperation } from '../infraestructure/user.operation';

const operation = new UserOperation();
const operationRole = new RoleOperation();
const useCase = new UserUseCase(operation, operationRole);
export class UserController {
  async list(req: Request, res: Response) {
    const result = await useCase.list();
    res.json(result);
  }

  async listOne(req: Request, res: Response) {
    const params = req.params;
    const id = +params.id;
    const user: Partial<UserModel> = { id };
    const result = await useCase.listOne(user);
    res.json(result);
  }

  async listByPage(req: Request, res: Response) {
    const params = req.params;
    const page = +params.page;
    const result = await useCase.listByPage(page, 20);
    res.json(result);
  }

  async insert(req: Request, res: Response): Promise<any> {
    const body = req.body;
    const user: UserModel = {
      name: body.name,
      email: body.email,
      photo: body.photo,
      password: body.password,
      roles: body.roles,
    };
    const result = await useCase.insertCipher(user);
    res.json(result);
  }

  async update(req: Request, res: Response) {
    const params = req.params;
    const body = req.body;

    const user: UserModel = body;
    const id = +params.id;

    const result = await useCase.update(user, { id });
    res.json(result);
  }

  async remove(req: Request, res: Response) {
    const params = req.params;
    const id = +params.id;
    const result = await useCase.remove({ id });
    res.json(result);
  }
}
