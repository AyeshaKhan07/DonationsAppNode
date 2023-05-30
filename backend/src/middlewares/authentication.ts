const jwt = require('jsonwebtoken');
import { Request, Response, Next } from 'express';

import { JWT_KEY } from '../constants';
import { HTTP_STATUS } from '../shared/http-status-codes';

// Whitelist of routes that do not require authentication
const whitelist = ['/api/login', '/api/signup'];

export default (req: Request, res: Response, next: Next) => {

    console.log(req.url);

    if (whitelist.includes(req.url))
        next();

    else {
        const authHeader = req.get('Authorization')

        if (!authHeader) {
            res.send({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: "No authentication header found."
            });

            return;
        }

        let decodedToken = null;

        try {
            const token = authHeader.split(' ')[1];
            decodedToken = jwt.verify(token, JWT_KEY);

            if (!decodedToken) {
                res.send({
                    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                    message: "Unable to decode jwt"
                });

                return;
            }

            next();

        } catch (error) {
            console.log(error);
            
            res.send({
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error"
            });

            return;
        }
    }
}
