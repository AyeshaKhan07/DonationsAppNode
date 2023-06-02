import * as Express from "express";

import { CreatePageDto } from "./dto";
import FundraiserController from "./controller";
import { validateRequest } from "../../middlewares/validate-request";
import ControllerWrapper from "../../utils/controller-wrapper";
import Route from "../../interfaces/router.interface";

class FundraiserRouter implements Route {
    public route = Express.Router();
    private fundraiserController = new FundraiserController();
    
    private wrappedCreatePage: Function;

    constructor() {
        this.wrapControllers();
        this.initializeControllers();
    }

    wrapControllers() {
        this.wrappedCreatePage = new ControllerWrapper(this.fundraiserController.createPage).wrapController();
    }

    initializeControllers() {
        this.route.route('/fundraiser-pages')
        .post(validateRequest(CreatePageDto), this.wrappedCreatePage);
    }
}

export default FundraiserRouter;