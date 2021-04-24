import { Request, Response, NextFunction } from 'express';

export interface IError extends Error {
  status?: number;
}

export class ErrorHandler {
  static asyncError(
    ftn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      ftn(req, res, next).catch((err) => {
        let error: IError;

        if (err.hasOwnProperty('code')) {
          error = new Error('Database error');
          error.message = err.name;
          error.stack = err;
          error.status = 500;
        } else {
          error = new Error('Async error');
          error.message = err.message;
          error.stack = err.stack;
          error.status = err.status;
        }

        next(error);
      });
    };
  }

  static pathNotFound(req: Request, res: Response, next: NextFunction) {
    const err: IError = new Error('Path not found');
    err.status = 404;
    next(err);
  }

  static generic(
    error: IError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const objError: IError = {
      name: error.name,
      status: error.status,
      message: error.message,
    };

    if (process.env.NODE_ENV !== 'production') {
      objError.stack = error.stack;
    }

    res.status(error.status).json(objError);
  }
}
