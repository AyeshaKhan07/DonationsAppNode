import * as Express from "express";

import AuthController from "./controller";
import { CreateUserDto, LoginUserDto } from "./dto";
import Route from "../../interfaces/router.interface";
import ControllerWrapper from "../../utils/controller-wrapper";
import { validateRequest } from "../../middlewares/validate-request";

class AuthRouter implements Route {
    public route = Express.Router();
    private authController = new AuthController();

    private wrappedSignup: Function;
    private wrappedLoginUser: Function;

    constructor() {
        this.wrapControllers();
        this.initializeControllers();
    }

    wrapControllers() {
        this.wrappedSignup = new ControllerWrapper(this.authController.signup).wrapController();
        this.wrappedLoginUser = new ControllerWrapper(this.authController.loginUser).wrapController();
    }

    initializeControllers() {
        this.route.post('/signup', validateRequest(CreateUserDto), this.wrappedSignup);
        this.route.post('/login', validateRequest(LoginUserDto), this.wrappedLoginUser);
    }
}

export default AuthRouter;