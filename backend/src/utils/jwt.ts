const jwt = require('jsonwebtoken')

import { JWT_KEY } from "../constants";

export function generateAccessToken(email: string) {
    return jwt.sign(email, JWT_KEY);
}