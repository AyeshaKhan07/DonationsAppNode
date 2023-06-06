import * as Express from "express";

import Route from "../../interfaces/router.interface";
import DonationController from "./donstions.controller";
import { CreateDonationDto } from "./dto/create-donation.dto";
import ControllerWrapper from "../../utils/controller-wrapper";
import { validateRequest } from "../../middlewares/validate-request";

class DonationsRouter implements Route {
    public route = Express.Router();
    private donationController = new DonationController();
    
    private wrappedCreateDonation: Function;

    constructor() {
        this.wrapControllers();
        this.initializeControllers();
    }

    wrapControllers() {
        this.wrappedCreateDonation = new ControllerWrapper(this.donationController.createDonation).wrapController();
    }

    initializeControllers() {
        this.route.route('/donations')
        .post(validateRequest(CreateDonationDto), this.wrappedCreateDonation);
    }
}

export default DonationsRouter;