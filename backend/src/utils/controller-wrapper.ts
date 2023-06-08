import { Request, Response } from 'express';

import HttpException from './http-exception';
import { HTTP_STATUS } from '../shared/http-status-codes';
import handleErrorResponse from './error-response.handler';

class ControllerWrapper {
    private controller: Function;

    constructor(controller: Function) {
        this.controller = controller;
    }

    public wrapController = () => {
        return async (req: Request, res: Response) => {
            const { INTERNAL_SERVER_ERROR } = HTTP_STATUS;

            try {
                const response = await this.controller(req, res);

                if (!response) {

                    const errorStatus = INTERNAL_SERVER_ERROR;
                    const errorMessage = 'Something went wrong';

                    const errorException = new HttpException(errorStatus, errorMessage);

                    console.log("Error: Contoller did not return response");

                    return handleErrorResponse(errorException, res);
                }

            } catch (error) {
                const { INTERNAL_SERVER_ERROR } = HTTP_STATUS;
                
                const errorStatus = error.status || INTERNAL_SERVER_ERROR;
                const errorMessage = errorStatus == INTERNAL_SERVER_ERROR ? 'Something went wrong' : error.message;
                
                const errorException = new HttpException(errorStatus, errorMessage);
                
                console.log("Error:", error.message);
                
                return handleErrorResponse(errorException, res);
            }
        };
    };
}

export default ControllerWrapper;