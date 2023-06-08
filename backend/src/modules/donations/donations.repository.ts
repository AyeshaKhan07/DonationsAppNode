
import { Donation } from "./donations.entity";
import UserRepository from "../users/repository";
import { connectionSource } from "../../database/data-source";
import { CreateDonationDto } from "./dto/create-donation.dto";

class DonationRepository {
    private donationRepository = connectionSource.getRepository(Donation);

    async create(page: CreateDonationDto) {
        return await this.donationRepository.save(page)
    }

    async getDonationsByUser(userId: number, page: number = null): Promise<Donation[]> {
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

}

export default DonationRepository;