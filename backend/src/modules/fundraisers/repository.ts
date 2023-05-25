import { Fundraiser } from "./fundraiser.entity";
import { connectionSource } from "../../database/data-source";
import { CreatePageDto } from "./dto";

class FundraiserRepository {
    private fundraiserRepository = connectionSource.getRepository(Fundraiser);

    public async create(page: CreatePageDto) {
        return await this.fundraiserRepository.save(page)
    }

}

export default FundraiserRepository;