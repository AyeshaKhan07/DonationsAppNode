import { CreatePageDto } from "./dto";
import { Fundraiser } from "./fundraiser.entity";
import HttpException from "../../utils/http-exception";
import { HTTP_STATUS } from "../../shared/http-status-codes";
import { connectionSource } from "../../database/data-source";

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

    async getFundraiserById(pageId: number): Promise<Fundraiser> {
        return await this.fundraiserRepository.findOneBy({ id: pageId })
    }

}

export default FundraiserRepository;