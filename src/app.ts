import express from 'express';
import { route as routeUser } from './user/adapter/user.route';
const app = express();

// Rutas
app.use('/users', routeUser);
export default app;
