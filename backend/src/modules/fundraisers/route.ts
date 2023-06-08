import { Router } from 'express';

import { CreatePageDto } from "./dto";
import FundraiserController from "./controller";
import Route from "../../abstracts/router.abstract";
import ControllerWrapper from "../../utils/controller-wrapper";
import { validateRequest } from "../../middlewares/validate-request";

class FundraiserRouter extends Route {
    
    private wrappedCreatePage: Function;

    wrapControllers() {
        this.wrappedCreatePage = new ControllerWrapper(FundraiserController.createPage).wrapController();
    }

    initializeControllers(route: Router) {
        route.route('/fundraiser-pages')
        .post(validateRequest(CreatePageDto), this.wrappedCreatePage);
    }
}

export default FundraiserRouter;