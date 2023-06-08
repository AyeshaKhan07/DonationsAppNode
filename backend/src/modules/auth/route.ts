import { Router } from 'express';

import AuthController from "./controller";
import { CreateUserDto, LoginUserDto } from "./dto";
import Route from "../../abstracts/router.abstract";
import ControllerWrapper from "../../utils/controller-wrapper";
import { validateRequest } from "../../middlewares/validate-request";

class AuthRouter extends Route {

    private wrappedSignup: Function;
    private wrappedLoginUser: Function;

    wrapControllers() {
        this.wrappedSignup = new ControllerWrapper(AuthController.signup).wrapController();
        this.wrappedLoginUser = new ControllerWrapper(AuthController.loginUser).wrapController();
    }

    initializeControllers(route: Router) {
        route.post('/signup', validateRequest(CreateUserDto), this.wrappedSignup);
        route.post('/login', validateRequest(LoginUserDto), this.wrappedLoginUser);
    }
}

export default AuthRouter;