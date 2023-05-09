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

        try {
            const createdUser = await UserRepository.create(user);
            const accessToken = generateAccessToken(createdUser.email);

            res.send({
                status: HTTP_STATUS.CREATED,
                message: 'User created',
                accessToken
            })
        } catch (error) {

            res.send({
                error
            })
        }
    }

    async loginUser(req: Request, res: Response) {
        const { email, password } = req.body;

        try {

            const user = await UserRepository.findByEmail(email);
            const hashPassword = await encryptTohashPassword(password);

            const passwordMatched = hashPassword == user.password;

            if (passwordMatched) {
                const accessToken = generateAccessToken(user.email);

                res.send({
                    status: HTTP_STATUS.OK,
                    message: 'Login successful!',
                    accessToken
                })
            }

            else res.send({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: 'Invalid credentials'
            })

        } catch (error) {
            console.log(error)
            res.send({
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error'
            })
        }
    }
}

export default AuthController;
