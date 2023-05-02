const jwt = require('jsonwebtoken')

import { JWT_TOKEN } from "../constants";

export function generateAccessToken(email: string) {
    return jwt.sign(email, JWT_TOKEN);
}