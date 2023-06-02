import { Request, Response } from 'express';

import { User } from "../users/user.entity";
import UserRepository from '../users/repository';
import { generateAccessToken } from '../../utils/jwt';
import { encryptTohashPassword } from '../../utils/crypto';
import { HTTP_STATUS } from '../../shared/http-status-codes';

class AuthController {
    protected user = new User();

    async signup(req: Request, res: Response) {
        const user = new User();
        const newUser = req.body;

        user.email = newUser.email
        user.contact = newUser.contact
        user.lastName = newUser.lastName
        user.password = newUser.password
        user.firstName = newUser.firstName

        const createdUser = await UserRepository.create(user);

        const jwtSignPayload = {
            id: createdUser.id,
            email: createdUser.email
        };
        const accessToken = generateAccessToken(jwtSignPayload);

        return res.status(HTTP_STATUS.CREATED).send({
            status: HTTP_STATUS.CREATED,
            message: 'User created',
            accessToken
        })
    }

    async loginUser(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await UserRepository.findByEmail(email);

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
