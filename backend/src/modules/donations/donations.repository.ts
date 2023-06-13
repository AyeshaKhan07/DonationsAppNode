
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
                
                /**
                 * lock: { mode: "pessimistic_write" } this locks the entity column/row, so that only one request is allowed to make
                 * modification at a time, other requests has to wait for the entity to get unlocked.
                 */

                const user = await transactionalEntityManager.findOne(User, {
                    where: { id: newDonation.user.id },
                    lock: { mode: "pessimistic_write" },
                    select: { id: true, totalDonations: true, totalDonationsRaised: true },
                });

                const fundraiserPage = await transactionalEntityManager.findOne(Fundraiser,
                    {
                        relations: {user: true},
                        where: {id: newDonation.page.id},
                        select: {id: true, totalFundsRaised: true },
                        lock: { mode: "pessimistic_write" },
                    });


                if (!user || !fundraiserPage)
                    throw new HttpException(HTTP_STATUS.NOT_FOUND, 'One of the dependent entity is missing');

                user.totalDonations += newDonation.amount;
                fundraiserPage.totalFundsRaised += newDonation.amount;

                if (user.id !== fundraiserPage.user.id) {

                    pageOwner = await transactionalEntityManager.findOne(User, {
                        where: { id: fundraiserPage.user.id },
                        lock: { mode: "pessimistic_write" },
                        select: { id: true, totalDonations: true, totalDonationsRaised: true },
                    });

                    pageOwner.totalDonationsRaised += newDonation.amount;

                    await transactionalEntityManager.save(User, pageOwner);
                }

                else user.totalDonationsRaised += newDonation.amount;

                await transactionalEntityManager.save(User, user);
                await transactionalEntityManager.save(Fundraiser, fundraiserPage);

            })

            return newDonation;

        } catch (error) {
            throw new HttpException(error.status, error.message)
        }

    }

}

export default DonationRepository;