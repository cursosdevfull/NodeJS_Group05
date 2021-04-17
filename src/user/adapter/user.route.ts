import express from 'express';
import { UserController } from './user.controller';
const controller = new UserController();
const route = express.Router();

route.get('/', controller.getAll);

export { route };
