import { Request, Response } from 'express';

import { Donation } from './donations.entity';
import DonationService from './donations.service';
import { HTTP_STATUS } from '../../shared/http-status-codes';

class DonationController {
    static async makeDonation(req: Request, res: Response) {
        const donationService = new DonationService();

        const newDonationPayload: Donation = await donationService.getCompiledNewDonationPayload(req.body, req.user.id);
        const createdDonation = await donationService.makeDonationSyncedWithUserAndPage(newDonationPayload);

        return res.status(HTTP_STATUS.CREATED).send({
            status: HTTP_STATUS.CREATED,
            message: 'Donation successfull',
            createdDonation
        });
    }

    static async getDonations(req: Request, res: Response) {
        const userId = req.user.id;
        const { page } = req.query;

        const donationService = new DonationService();

        const donations = await donationService.getDonations(userId, page);

        if (!donations.length)
            return res.status(HTTP_STATUS.NOT_FOUND).send({
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No donations found',
                donations
            });

        return res.status(HTTP_STATUS.FOUND).send({
            status: HTTP_STATUS.FOUND,
            message: 'Donations found',
            donations
        });
    }
}

export default DonationController;