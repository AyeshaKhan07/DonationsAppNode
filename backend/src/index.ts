// Load env variables.
import * as dotenv from 'dotenv'
dotenv.config()

// Library imports here
import * as express from 'express';
// import * as cors from "cors";
// import * as morgan from "morgan";

// Local imports here
import App from './app';
import AuthRouter from './modules/auth/route';
import authMiddleware from './middlewares/authentication';

const routers = [new AuthRouter()]
const middlewares = [authMiddleware, express.urlencoded({ extended: true }), express.json(),]

const app = new App(routers, middlewares, Number(process.env.APP_PORT));

app.listen();
