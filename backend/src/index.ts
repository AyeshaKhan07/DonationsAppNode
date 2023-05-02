// Load env variables.
import * as dotenv from 'dotenv'
dotenv.config()

// Library imports here
import * as Express from 'express';
// import * as  expressValidator from "express-validator";
// import * as cors from "cors";
// import * as morgan from "morgan";
// import * as database from "./database/index";
// import { json } from "body-parser";

// Local imports here
import userRoutes from './modules/users/route';
import { establishConnection } from './database';
import authMiddleware from './middlewares/authentication';

// Connect database.
establishConnection();

// Create express app
const app = Express();

// Configure middleware stack
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(authMiddleware);



// app.use(morgan("combined"));
// app.use(cors());
// app.use(json({ limit: "10mb", inflate: true }));

// app.use(expressValidator());

// Connect modules here.
app.use("/users", userRoutes);

// Start the server
app.listen(process.env.PORT ? process.env.PORT : 4000, () => {
    console.log(`Listening on port ${process.env.PORT ? process.env.PORT : 4000}`);
});
