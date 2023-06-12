
import { User } from "../users/user.entity";
import { Donation } from "./donations.entity";
import HttpException from "../../utils/http-exception";
import { HTTP_STATUS } from "../../shared/http-status-codes";
import { connectionSource } from "../../database/data-source";
import { CreateDonationDto } from "./dto/create-donation.dto";
import { Fundraiser } from "../fundraisers/fundraiser.entity";

class DonationRepository {
    private donationRepository = connectionSource.getRepository(Donation);

    async findById(id: number): Promise<Donation> {
        return await this.donationRepository.findOneBy({ id });
    }

    async create(page: CreateDonationDto): Promise<Donation> {
        return await this.donationRepository.save(page)
    }

    async getDonations(userId: number, page: number = null): Promise<Donation[]> {
        let condition = {};

        if (page)
            condition = {
                page: {
                    id: page
                }
            }

        else condition = condition = {
            user: {
                id: userId
            }
        }

        return await this.donationRepository.find({
            select: {
                amount: true,
                donationType: true,
                status: true,
            },

            relations: {
                page: !page ? true : false,
                city: true,
                user: page ? true : false
            },

            where: condition

        });
    }
    
    /**
     * The function creates the donation, updates total donations amount of user, updates total funds raised of the funsraiser page,
     * and updates the total funds raised of page owner in database. All these transactions will rollback if any of them fails. 
     * 
     * @param newDonationPayload 
     * @returns createdDonation 
     */

    async makeDonationSyncedWithUserAndPage(newDonationPayload: CreateDonationDto): Promise<Donation> {

        let newDonation: Donation;

        try {
            await connectionSource.transaction(async (transactionalEntityManager) => {
                newDonation = await transactionalEntityManager.save(Donation, newDonationPayload);

                let pageOwner: User;
                const user = await transactionalEntityManager.findOneBy(User, { id: newDonation.user.id });
                const fundraiserPage = await transactionalEntityManager.findOneBy(Fundraiser, { id: newDonation.page.id });
                const page = await transactionalEntityManager.findOne(Fundraiser, { relations: { user: true }, where: { id: newDonation.page.id } });

                if (!user || !page || !fundraiserPage)
                    throw new HttpException(HTTP_STATUS.NOT_FOUND, 'One of the dependent entity is missing');

                if (user.id !== page.user.id) {
                    pageOwner = await transactionalEntityManager.findOneBy(User, { id: page.user.id });

                    user.totalDonations += newDonation.amount;
                    pageOwner.totalDonationsRaised += newDonation.amount;

                    await transactionalEntityManager.save(User, user);
                    await transactionalEntityManager.save(User, pageOwner);
                }
                else {
                    user.totalDonations += newDonation.amount;
                    user.totalDonationsRaised += newDonation.amount;
                    await transactionalEntityManager.save(User, user);
                }

                fundraiserPage.totalFundsRaised += newDonation.amount;

                await transactionalEntityManager.save(Fundraiser, fundraiserPage);

            })

            return newDonation;

        } catch (error) {
            throw new HttpException(error.status, error.message)
        }

    }

}

export default DonationRepository;