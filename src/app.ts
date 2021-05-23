import express, { Request, Response } from 'express';
import { ErrorHandler } from './helper/errors.handler';
import { route as routeUser } from './user/adapter/user.route';
import { route as routeAuth } from './auth/adapter/auth.route';
import { route as routeRole } from './role/adapter/role.route';
import multer from 'multer';

multer();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/users', routeUser);
app.use('/auth', routeAuth);
app.use('/roles', routeRole);

app.get('/health', (req: Request, res: Response) => res.send('Todo está ok'));

// Errors
app.use(ErrorHandler.pathNotFound);
app.use(ErrorHandler.generic);

export default app;
