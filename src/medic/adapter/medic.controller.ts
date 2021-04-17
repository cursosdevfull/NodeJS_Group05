import { Request, Response } from 'express';
import { UserUseCase } from '../application/user.usecase';
import { UserOperation } from '../infraestructure/user.operation';

const operation = new UserOperation();
const useCase = new UserUseCase(operation);
export class UserController {
  list(req: Request, res: Response) {
    const result = useCase.list();
    // res.type("application/json").status(200).send(JSON.stringify(result))
    res.json(result);
  }

  listOne(req: Request, res: Response) {
    const user = req.body;
    const result = useCase.listOne(user);
    res.json(result);
  }

  listByPage(req: Request, res: Response) {
    const result = useCase.listByPage(+req.params.page);
    res.json(result);
  }

  insert(req: Request, res: Response) {
    const user = req.body;
    const result = useCase.insert(user);
    res.json(result);
  }

  update(req: Request, res: Response) {
    const user = req.body;
    const result = useCase.update(user);
    res.json(result);
  }

  remove(req: Request, res: Response) {
    const user = req.body;
    const result = useCase.remove(user);
    res.json(result);
  }
}
