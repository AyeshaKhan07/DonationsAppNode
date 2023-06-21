import { Router } from 'express';

import { CreatePageDto } from "./dto";
import FundraiserController from "./controller";
import Route from "../../abstracts/router.abstract";
import VanillaController from "../../utils/controller-wrapper";
import { validateRequest } from "../../middlewares/validate-request";

class FundraiserRouter extends Route {
    
    private wrappedCreatePage: Function;

    wrapControllers() {
        this.wrappedCreatePage = VanillaController.wrap(FundraiserController.createPage);
    }

    initializeControllers(route: Router) {
        route.route('/fundraiser-pages')
        .post(validateRequest(CreatePageDto), this.wrappedCreatePage);
    }
}

export default FundraiserRouter;