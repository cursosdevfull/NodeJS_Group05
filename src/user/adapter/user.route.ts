import express from 'express';
import { UserController } from './user.controller';
import { Validators } from '../../shared/adapter/validator';
import { schemas } from './user.schema';
import { ErrorHandler } from '../../helper/errors.handler';
import { AuthenticationGuard } from '../../shared/infraestructure/guards/authentication.guard';
import { AuthorizationGuard } from '../../shared/infraestructure/guards/authorization.guard';
import { Upload } from '../../shared/infraestructure/middlewares/upload.middleware';
const controller = new UserController();
const route = express.Router();

route.get(
  '/',
  AuthenticationGuard.canActivate,
  AuthorizationGuard.canActivate('ADMIN', 'MEDIC'),
  controller.list
);
route.get(
  '/:id',
  AuthenticationGuard.canActivate,
  Validators.validate(schemas.LIST_ONE),
  controller.listOne
);
route.get(
  '/page/:page',
  Validators.validate(schemas.LIST_BY_PAGE),
  controller.listByPage
);
route.post(
  '/',
  AuthenticationGuard.canActivate,
  AuthorizationGuard.canActivate('ADMIN'),
  Upload.S3('photo', 'image/png', 'image/jpeg', 'image/jpg', 'image/gif'),
  Validators.validate(schemas.INSERT),
  ErrorHandler.asyncError(controller.insert)
);
route.put(
  '/:id',
  AuthenticationGuard.canActivate,
  AuthorizationGuard.canActivate('ADMIN'),
  Validators.validate(schemas.UPDATE),
  controller.update
);
route.delete(
  '/:id',
  AuthenticationGuard.canActivate,
  AuthorizationGuard.canActivate('ADMIN'),
  Validators.validate(schemas.REMOVE),
  controller.remove
);

export { route };
