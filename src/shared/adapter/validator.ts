import { NextFunction, Request, Response } from 'express';

export class Validators {
  static validate(objSchema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
      const listOriginParameters = ['params', 'query', 'body', 'headers'];

      const listValidations: Array<Promise<any>> = [];
      listOriginParameters.forEach((origin: string) => {
        if (objSchema.hasOwnProperty(origin)) {
          switch (origin) {
            case 'params':
              listValidations.push(objSchema[origin].validate(req.params));
              break;
            case 'query':
              listValidations.push(objSchema[origin].validate(req.query));
              break;
            case 'body':
              listValidations.push(objSchema[origin].validate(req.body));
              break;
            case 'headers':
              listValidations.push(objSchema[origin].validate(req.headers));
              break;
          }
        }
      });

      Promise.all(listValidations).then((results) => {
        const lengthResults = results.length;
        for (let ind = 0; ind < lengthResults; ind++) {
          if (results[ind].hasOwnProperty('error')) {
            return res
              .status(411)
              .json({ status: 411, stack: results[ind].error });
          }
        }
        next();
      });

      /*     let dataToValidate;

    switch (location) {
      case 'params':
        dataToValidate = req.params;
        break;
      case 'body':
        dataToValidate = req.body;
        break;
    }
    const result = schema.validate(dataToValidate);
    if (result.hasOwnProperty('error')) {
      return res.status(411).json({ status: 411, stack: result.error });
    }

    next(); */
    };
  }
}
