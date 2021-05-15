import express from 'express';
import { RoleController } from './role.controller';

import { AuthenticationGuard } from '../../shared/infraestructure/guards/authentication.guard';
const controller = new RoleController();
const route = express.Router();

route.get('/', /* AuthenticationGuard.canActivate, */ controller.list);

export { route };
