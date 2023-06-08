import { Router } from 'express';

import Route from "../../abstracts/router.abstract";
import DonationController from "./donstions.controller";
import { CreateDonationDto } from "./dto/create-donation.dto";
import ControllerWrapper from "../../utils/controller-wrapper";
import { validateRequest } from "../../middlewares/validate-request";

class DonationsRouter extends Route {    
    private wrappedCreateDonation: Function;
    private wrappedGetDonationsByUser: Function;

    wrapControllers() {
        this.wrappedCreateDonation = new ControllerWrapper(DonationController.createDonation).wrapController();
        this.wrappedGetDonationsByUser = new ControllerWrapper(DonationController.getDonationsByUser).wrapController();
    }

    initializeControllers(route: Router) {
        route.route('/donations')
        .post(validateRequest(CreateDonationDto), this.wrappedCreateDonation)
        .get(this.wrappedGetDonationsByUser)
    }
}

export default DonationsRouter;