import { Request, Response } from 'express';
import { RoleUseCase } from '../application/role.usecase';
import { RoleModel } from '../domain/role.model';
import { RoleOperation } from '../infraestructure/role.operation';

const operation = new RoleOperation();
const useCase = new RoleUseCase(operation);
export class RoleController {
  async list(req: Request, res: Response) {
    const result = await useCase.list();
    res.json(result);
  }

  async listOne(req: Request, res: Response) {
    const params = req.params;
    const id = +params.id;
    const role: Partial<RoleModel> = { id };
    const result = await useCase.listOne(role);
    res.json(result);
  }
}
