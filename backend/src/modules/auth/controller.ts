import { Request, Response } from 'express';

import { User } from "../users/user.entity";
import UserRepository from '../users/repository';
import { generateAccessToken } from '../../utils/jwt';
import { encryptTohashPassword } from '../../utils/crypto';
import { HTTP_STATUS } from '../../shared/http-status-codes';

class AuthController {
    static async signup(req: Request, res: Response) {

        const userRepository = new UserRepository();

        const {createdUser, accessToken} = await userRepository.create(req.body);

        return res.status(HTTP_STATUS.CREATED).send({
            status: HTTP_STATUS.CREATED,
            message: 'User created',
            user: createdUser,
            accessToken
        })
    }

    static async loginUser(req: Request, res: Response) {
        const userRepository = new UserRepository();
        
        const { email, password } = req.body;

        const user = await userRepository.findByEmail(email, true);

        if (!user) return res.status(HTTP_STATUS.UNAUTHORIZED).send({
            status: HTTP_STATUS.UNAUTHORIZED,
            message: 'Invalid credentials'
        })

        const hashPassword = await encryptTohashPassword(password);
        const passwordMatched = hashPassword == user.password;

        if (passwordMatched) {

            const jwtSignPayload = {
                id: user.id,
                email: user.email
            };
            const accessToken = generateAccessToken(jwtSignPayload);

            return res.send({
                status: HTTP_STATUS.OK,
                message: 'Login successful!',
                accessToken
            })
        }

        else return res.status(HTTP_STATUS.UNAUTHORIZED).send({
            status: HTTP_STATUS.UNAUTHORIZED,
            message: 'Invalid credentials'
        })
    }
}

export default AuthController;
