import { RequestHandler, Router } from 'express';

import AuthController from "./controller";
import { CreateUserDto, LoginUserDto } from "./dto";
import Route from "../../abstracts/router.abstract";
import VanillaController from "../../utils/controller-wrapper";
import { validateRequest } from "../../middlewares/validate-request";

class AuthRouter extends Route {

    private wrappedSignup: RequestHandler;
    private wrappedLoginUser: RequestHandler;

    wrapControllers() {
        this.wrappedSignup = VanillaController.wrap(AuthController.signup);
        this.wrappedLoginUser = VanillaController.wrap(AuthController.loginUser);
    }

    initializeControllers(router: Router) {
        router.post('/signup', validateRequest(CreateUserDto), this.wrappedSignup);
        router.post('/login', validateRequest(LoginUserDto), this.wrappedLoginUser);
    }
}

export default AuthRouter;