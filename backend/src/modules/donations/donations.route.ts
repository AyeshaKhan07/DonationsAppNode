import { Router } from 'express';

import Route from "../../abstracts/router.abstract";
import DonationController from "./donations.controller";
import { CreateDonationDto } from "./dto/create-donation.dto";
import VanillaController from "../../utils/controller-wrapper";
import { validateRequest } from "../../middlewares/validate-request";

class DonationsRouter extends Route {    
    private wrappedCreateDonation: Function;
    private wrappedGetDonations: Function;

    async wrapControllers() {
        this.wrappedCreateDonation = VanillaController.wrap(DonationController.makeDonation);
        this.wrappedGetDonations = VanillaController.wrap(DonationController.getDonations);
    }

    initializeControllers(route: Router) {
        route.route('/donations')
        .post(validateRequest(CreateDonationDto), this.wrappedCreateDonation)
        .get(this.wrappedGetDonations)
    }
}

export default DonationsRouter;