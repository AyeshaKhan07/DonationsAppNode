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
import FundraiserRouter from './modules/fundraisers/route';
import DonationsRouter from './modules/donations/donations.route';

const routers = [new AuthRouter(), new FundraiserRouter(), new DonationsRouter()]
const middlewares = [authMiddleware, express.urlencoded({ extended: true }), express.json(),]

const app = new App(routers, middlewares, Number(process.env.APP_PORT));

app.listen();
