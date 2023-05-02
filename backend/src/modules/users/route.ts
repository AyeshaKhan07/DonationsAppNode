import * as Express from "express";
import UserController from "./controller";
import { validateRequest } from "../../middlewares/validate-request";
import { CreateUserDto, LoginUserDto } from "./dto";
// import vanillaController from "../../helpers/vanilla-controller";

const router = Express.Router();

router.route('/')
.get(UserController.fetchAllUsers)

router.post('/signup', validateRequest(CreateUserDto), UserController.signup);
router.post('/login', validateRequest(LoginUserDto), UserController.loginUser);

export default router;
  