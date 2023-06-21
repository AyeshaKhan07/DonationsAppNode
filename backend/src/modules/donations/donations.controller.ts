import { Request, Response } from 'express';

import { Donation } from './donations.entity';
import DonationRepository from './donations.repository';
import { HTTP_STATUS } from '../../shared/http-status-codes';

class DonationController {
    static async makeDonation(req: Request, res: Response) {
        const donationRepository = new DonationRepository();

        const newDonationPayload: Donation = await donationRepository.getCompiledNewDonationPayload(req.body, req.user.id);
        const createdDonation = await donationRepository.makeDonationSyncedWithUserAndPage(newDonationPayload);

        return res.status(HTTP_STATUS.CREATED).send({
            status: HTTP_STATUS.CREATED,
            message: 'Donation successfull',
            createdDonation
        });
    }

    static async getDonations(req: Request, res: Response) {
        const userId = req.user.id;
        const { page } = req.query;

        const donationRepository = new DonationRepository();

        const donations = await donationRepository.getDonations(userId, page);

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