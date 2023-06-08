import { Request, Response } from 'express';

import { Donation } from './donations.entity';
import DonationRepository from './donations.repository';
import { HTTP_STATUS } from '../../shared/http-status-codes';

class DonationController {
    static async createDonation(req: Request, res: Response) {
        const user = req.user;
        const newDonationPayload = req.body;

        const newDonation = new Donation();
        const donationRepository = new DonationRepository();

        newDonation.amount = newDonationPayload.amount;
        newDonation.donationType = newDonationPayload.donationType;
        newDonation.anonymousDonation = newDonationPayload.anonymousDonation;
        newDonation.transactionFeeCovered = newDonationPayload.transactionFeeCovered;
        newDonation.city = newDonationPayload.city;
        newDonation.paymentMethod = newDonationPayload.paymentMethod;
        newDonation.user = user.id;
        newDonation.page = newDonationPayload.page;

        const createdDonation = await donationRepository.create(newDonation);

        return res.status(HTTP_STATUS.CREATED).send({
            status: HTTP_STATUS.CREATED,
            message: 'Donation successfull',
            createdDonation
        });
    }

    static async getDonationsByUser(req: Request, res: Response) {
        const userId = req.user.id;
        const { page } = req.query;

        const donationRepository = new DonationRepository();

        const donations = await donationRepository.getDonationsByUser(userId, page);

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