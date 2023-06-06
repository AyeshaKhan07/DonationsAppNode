
import { Donation } from "./donations.entity";
import { connectionSource } from "../../database/data-source";
import { CreateDonationDto } from "./dto/create-donation.dto";

class DonationRepository {
    private donationRepository = connectionSource.getRepository(Donation);

    public async create(page: CreateDonationDto) {
        return await this.donationRepository.save(page)
    }

}

export default DonationRepository;