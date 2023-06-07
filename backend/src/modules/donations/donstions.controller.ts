import { Request, Response } from 'express';

import { Donation } from './donations.entity';
import DonationRepository from './donations.repository';
import { HTTP_STATUS } from '../../shared/http-status-codes';

class DonationController {
    async createDonation (req: Request, res: Response) {
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
}

export default DonationController;