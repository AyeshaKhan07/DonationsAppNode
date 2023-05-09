import * as Express from "express";
import { validateRequest } from "../../middlewares/validate-request";
import { CreateUserDto, LoginUserDto } from "./dto";
import AuthController from "./controller";

class AuthRouter {
    public route = Express.Router();
    private authController = new AuthController();

    constructor() {
        this.initializeControllers();
    }

    public initializeControllers() {
        // this.router.route('/')
        //     .get(UserController.fetchAllUsers)

        this.route.post('/signup', validateRequest(CreateUserDto), this.authController.signup);
        this.route.post('/login', validateRequest(LoginUserDto), this.authController.loginUser);
    }
}

export default AuthRouter;