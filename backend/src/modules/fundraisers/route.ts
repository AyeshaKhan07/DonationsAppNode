import * as Express from "express";

import { CreatePageDto } from "./dto";
import FundraiserController from "./controller";
import { validateRequest } from "../../middlewares/validate-request";

class FundraiserRouter {
    public route = Express.Router();
    private fundraiserController = new FundraiserController();

    constructor() {
        this.initializeControllers();
    }

    public initializeControllers() {

        this.route.post('/create', validateRequest(CreatePageDto), this.fundraiserController.createPage);
    }
}

export default FundraiserRouter;