import { Request, Response, NextFunction } from 'express';
import { IError } from '../../../helper/errors.handler';
import { UserService } from '../../../user/application/user.service';

export class AuthenticationGuard {
  static canActivate(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    const authorizationHeader: string = headers['authorization'];
    if (authorizationHeader) {
      const partsAuthentication = authorizationHeader.split(' ');
      // Authorization: Bearer xxxxxx
      if (partsAuthentication.length > 1) {
        const accessToken = partsAuthentication[1];
        UserService.validateAccessToken(accessToken).then(
          (payload) => {
            console.log('token válido');
            res.locals.payload = payload;
            next();
          },
          (error) => {
            if (error.status === 401) {
              const error: IError = new Error('Usuario no permitido');
              error.status = 401;
              next(error);
            } else if (error.status === 409) {
              const error: IError = new Error('El token ha expirado');
              error.status = 409;
              next(error);
            }
          }
        );
      } else {
        const error: IError = new Error('Usuario no autenticado');
        error.status = 401;
        return next(error);
      }
    } else {
      const error: IError = new Error('User is not authenticated');
      error.status = 401;
      next(error);
    }
  }
}
