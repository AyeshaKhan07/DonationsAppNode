import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import HttpException from '../utils/http-exception';
import { HTTP_STATUS } from '../shared/http-status-codes';
import handleErrorResponse from '../utils/error-response.handler';

// This middleware function validates the incoming request body
export const validateRequest = (type: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const errors = await getValidationErrors(req.body, type);

      if (Object.keys(errors).length) {

        const exception = new HttpException(HTTP_STATUS.BAD_REQUEST, "Required fields validation errors")
        return handleErrorResponse(exception, res, errors);

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

export const getValidationErrors = async (reqBody: any, dtoType: any) => {

  const objectToValidate = new dtoType();

  Object.keys(reqBody).forEach((key) => {
    objectToValidate[key] = reqBody[key];
  });

  const errors = await validate(objectToValidate);

  if (errors.length) {
    const errorResponse = {}

    for (const error of errors) {
      errorResponse[error.property] = Object.values(error.constraints)[0]
    }

    return errorResponse
  }

  else return {};
}