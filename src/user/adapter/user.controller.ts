import { Request, Response } from 'express';

export class UserController {
  getAll(req: Request, res: Response) {
    res.send('List of users');
  }
}
