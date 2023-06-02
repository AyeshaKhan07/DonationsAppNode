import { Response } from 'express';
import HttpException from './http-exception';
import { HTTP_STATUS } from '../shared/http-status-codes';

function handleErrorResponse(error: HttpException, response: Response, errors: Object = {}) {
    
    const status = error.status;
    const message = error.status == HTTP_STATUS.INTERNAL_SERVER_ERROR ? "Something went wrong!" : error.message;
    response.status(status).send({ status, message, errors });
    
    console.log("Error Message:", error.message);
}

export default handleErrorResponse;