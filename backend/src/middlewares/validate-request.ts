import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import HttpException from '../utils/http-exception';
import { HTTP_STATUS } from '../shared/http-status-codes';
import handleErrorResponse from '../utils/error-response.handler';

// This middleware function validates the incoming request body
export const validateRequest = (type: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const objectToValidate = new type();

      Object.keys(req.body).forEach((key) => {
        objectToValidate[key] = req.body[key];
      });

      const errors = await validate(objectToValidate);

      if (errors.length) {
        const errorResponse = {}

        for (const error of errors) {
          errorResponse[error.property] = Object.values(error.constraints)[0]
        }

        const exception = new HttpException(HTTP_STATUS.BAD_REQUEST, "Required fields are not provided")
        return handleErrorResponse(exception, res, errorResponse);

      }
      next();
    } catch (error) {
      const status = error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      const message = error.message || "Something went wrong";

      const exception = new HttpException(status, message)

      return handleErrorResponse(exception, res);
    }
  };
};