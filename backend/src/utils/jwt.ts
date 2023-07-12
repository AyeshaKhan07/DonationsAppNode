const jwt = require('jsonwebtoken')

import { JWT_KEY } from "../constants";
import { JwtSignPayload } from "../interfaces";

export function generateAccessToken(jwtSignPayload: JwtSignPayload) {
    return jwt.sign(jwtSignPayload, JWT_KEY);
}