import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';

// This middleware function validates the incoming request body
export const validateRequest = (type: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const objectToValidate = new type();

    Object.keys(req.body).forEach((key) => {
      objectToValidate[key] = req.body[key];
    });

    const errors = await validate(objectToValidate);
    
    if (errors.length) {
        const errorResponse = {}
        for(const error of errors)
        {
            errorResponse[error.property] = Object.values(error.constraints)[0]
        }
      return res.status(400).json({ errors: errorResponse });
    }
    next();
  };
};