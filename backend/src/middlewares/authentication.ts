const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

import { JWT_KEY } from '../constants';
import HttpException from '../utils/http-exception';
import { HTTP_STATUS } from '../shared/http-status-codes';
import handleErrorResponse from '../utils/error-response.handler';
import UserService from '../modules/users/user.service';

// Whitelist of routes that do not require authentication
const whitelist = ['/api/login', '/api/signup'];

export default async (req: Request, res: Response, next: NextFunction) => {

    console.log("\nURL:", req.url);

    if (whitelist.includes(req.url))
        next();

    else {
        const authHeader = req.get('Authorization')

        if (!authHeader) {
            const exception = new HttpException(HTTP_STATUS.UNAUTHORIZED, "No authentication header found.")
            return handleErrorResponse(exception, res);
        }

        let decodedToken = null;

        try {
            const userService = new UserService();

            const token = authHeader.split(' ')[1];
            decodedToken = jwt.verify(token, JWT_KEY);

            if (!decodedToken) {
                const exception = new HttpException(HTTP_STATUS.INTERNAL_SERVER_ERROR, "Unable to decode jwt")
                return handleErrorResponse(exception, res);
            }

            await userService.findByIdOrFail(decodedToken.id);
            
            req["user"] = decodedToken;

            next();

        } catch (error) {
            const exception = new HttpException(error.status, error.message)
            return handleErrorResponse(exception, res);
        }
    }
}
