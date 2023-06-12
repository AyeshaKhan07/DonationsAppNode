import { Request, Response } from 'express';

import { Donation } from './donations.entity';
import DonationRepository from './donations.repository';
import { HTTP_STATUS } from '../../shared/http-status-codes';
import UserRepository from '../users/repository';
import FundraiserRepository from '../fundraisers/repository';

class DonationController {
    static async makeDonation(req: Request, res: Response) {
        const newDonationPayload = req.body;

        const newDonation = new Donation();
        const userRepository = new UserRepository();
        const donationRepository = new DonationRepository();
        const fundraiserRepository = new FundraiserRepository();

        const user = await userRepository.findById(req.user.id);
        const fundraiser = await fundraiserRepository.findById(newDonationPayload.page);

        newDonation.user = user;
        newDonation.page = fundraiser;
        newDonation.city = newDonationPayload.city;
        newDonation.amount = newDonationPayload.amount;
        newDonation.donationType = newDonationPayload.donationType;
        newDonation.paymentMethod = newDonationPayload.paymentMethod;
        newDonation.anonymousDonation = newDonationPayload.anonymousDonation;
        newDonation.transactionFeeCovered = newDonationPayload.transactionFeeCovered;

        const createdDonation = await donationRepository.makeDonationSyncedWithUserAndPage(newDonation);

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