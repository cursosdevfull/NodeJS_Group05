import express from 'express';
import { AuthController } from './auth.controller';
import { Validators } from '../../shared/adapter/validator';
import { schemas } from './auth.schema';
import { ErrorHandler } from '../../helper/errors.handler';
const controller = new AuthController();
const route = express.Router();

route.post(
  '/login',
  Validators.validate(schemas.LOGIN),
  ErrorHandler.asyncError(controller.login)
);
export { route };
