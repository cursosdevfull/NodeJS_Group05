import express from 'express';
import { route as routeUser } from './user/adapter/user.route';
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Rutas
app.use('/users', routeUser);

export default app;
