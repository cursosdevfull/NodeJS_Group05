import { Request, Response } from 'express';
import { UserModel } from '../../user/domain/user.model';
import { AuthUseCase } from '../application/auth.usecase';
import { AuthOperation } from '../infraestructure/auth.operation';

const operation = new AuthOperation();
const useCase = new AuthUseCase(operation);
export class AuthController {
  async login(req: Request, res: Response): Promise<any> {
    const body = req.body;
    const user: Partial<UserModel> = {
      email: body.email,
      password: body.password,
    };
    const result = await useCase.login(user);
    res.json(result);
  }
}
