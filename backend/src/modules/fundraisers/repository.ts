import { Fundraiser } from "./fundraiser.entity";
import { connectionSource } from "../../database/data-source";
import { CreatePageDto } from "./dto";
import HttpException from "../../utils/http-exception";
import { HTTP_STATUS } from "../../shared/http-status-codes";

class FundraiserRepository {
    private fundraiserRepository = connectionSource.getRepository(Fundraiser);

    public async create(page: CreatePageDto) {
        return await this.fundraiserRepository.save(page)
    }

    async findById(id: number) {
        const page = await this.fundraiserRepository.findOneBy({ id });

        if (!page)
            throw new HttpException(HTTP_STATUS.NOT_FOUND, "Page not found")

        return page
    }

}

export default FundraiserRepository;