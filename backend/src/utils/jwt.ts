const jwt = require('jsonwebtoken')

import { JWT_KEY } from "../constants";

interface JwtSignPayload {
    id: Number,
    email: String,
}

export function generateAccessToken(jwtSignPayload: JwtSignPayload) {
    return jwt.sign(jwtSignPayload, JWT_KEY);
}