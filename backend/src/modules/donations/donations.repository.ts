
import { User } from "../users/user.entity";
import { Donation } from "./donations.entity";
import HttpException from "../../utils/http-exception";
import { HTTP_STATUS } from "../../shared/http-status-codes";
import { connectionSource } from "../../database/data-source";
import { CreateDonationDto } from "./dto/create-donation.dto";
import { Fundraiser } from "../fundraisers/fundraiser.entity";
import UserRepository from "../users/repository";
import CityRepository from "../cities/city.repository";
import CountryRepository from "../countries/country.repository";
import FundraiserRepository from "../fundraisers/repository";
import PaymentMethodRepository from "../payment-methods/payments.repository";

class DonationRepository {
    private donationRepository = connectionSource.getRepository(Donation);

    async findById(id: number): Promise<Donation> {
        return await this.donationRepository.findOneBy({ id });
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
     * This service returns compiled payload for creating new donation. The payload we receive in request body does not contains
     * curreny and country because we can retrive these two from city id, as city id is associated with country and country id is 
     * associated with currency. Also, we just get numeric values for payment method, city, and fundraiser from request body, and the 
     * donation entity expects entity objects for each of them, this service gets the entity associated with these values and returns
     * complete payload to make new donation
     * 
     * @param newDonationPayload (this is request body sent from API) 
     * @param userId (user id retrived from token)
     * @returns Donation
     */

    async getCompiledNewDonationPayload(newDonationPayload: CreateDonationDto, userId: number): Promise<Donation> {
        
        const newDonation = new Donation();
        const userRepository = new UserRepository();
        const cityRepository = new CityRepository();
        const countryRepository = new CountryRepository();
        const fundraiserRepository = new FundraiserRepository();
        const paymentMethodRepository = new PaymentMethodRepository();

        const user = await userRepository.findByIdOrFail(userId);
        const city = await cityRepository.findByIdOrFail(newDonationPayload.city);
        const country = await cityRepository.getCountryOrFail(newDonationPayload.city);
        const currency = await countryRepository.getCurrencyOrFail(country.id);
        const donatedTo = await userRepository.findByIdOrFail(newDonationPayload.donatedTo);
        const fundraiser = await fundraiserRepository.findByIdOrFail(newDonationPayload.page);
        const paymentMethod = await paymentMethodRepository.findByIdOrFail(newDonationPayload.paymentMethod)

        newDonation.user = user;
        newDonation.city = city;
        newDonation.page = fundraiser;
        newDonation.country = country;
        newDonation.currency = currency;
        newDonation.donatedTo = donatedTo;
        newDonation.paymentMethod = paymentMethod;
        newDonation.amount = newDonationPayload.amount;
        newDonation.donationType = newDonationPayload.donationType;
        newDonation.anonymousDonation = newDonationPayload.anonymousDonation;
        newDonation.transactionFeeCovered = newDonationPayload.transactionFeeCovered;

        return newDonation;
    }

    /**
     * The function creates the donation, updates total donations amount of user, updates total funds raised of the funsraiser page,
     * and updates the total funds raised of page owner in database. All these transactions will rollback if any of them fails.
     * 
     * @param newDonationPayload 
     * @returns createdDonation 
     */

    async makeDonationSyncedWithUserAndPage(newDonationPayload: Donation): Promise<Donation> {

        let newDonation: Donation;

        try {
            await connectionSource.transaction(async (transactionalEntityManager) => {
                newDonation = await transactionalEntityManager.save(Donation, newDonationPayload);
                
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
                        relations: {pageOwner: true},
                        where: {id: newDonation.page.id},
                        select: {id: true, totalFundsRaised: true },
                        lock: { mode: "pessimistic_write" },
                    });


                if (!user || !fundraiserPage)
                    throw new HttpException(HTTP_STATUS.NOT_FOUND, 'One of the dependent entity is missing');

                user.totalDonations += newDonation.amount;
                fundraiserPage.totalFundsRaised += newDonation.amount;

                /**
                 * We need to update totalDonations of user who is donating and totalDonationsRaised of team member to which this
                 * donation is pointed to. We have two cases here:
                 * Case 1: Both the users are same that means the user is donating to himself
                 * Case 2: Both the users are different
                 * For case 1, we have to update totalDonations and totalDonationsRaised of same user and for case 2, we have to update
                 * totalDonations of user who is donating and totalDonationsRaised of user who is getting the donation
                 */

                if(newDonation.donatedTo.id == user.id)
                    user.totalDonationsRaised += newDonation.amount;

                else {
                    const donatedToMember = await transactionalEntityManager.findOne(User, {
                        where: { id: newDonation.donatedTo.id },
                        lock: { mode: "pessimistic_write" },
                        select: { id: true, totalDonations: true, totalDonationsRaised: true },
                    });

                    donatedToMember.totalDonationsRaised += newDonation.amount;

                    await transactionalEntityManager.save(User, donatedToMember);
                }

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