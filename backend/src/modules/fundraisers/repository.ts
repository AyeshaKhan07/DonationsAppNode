import { Fundraiser } from "./fundraiser.entity";
import { FundraiserSelect } from "../../interfaces";
import HttpException from "../../utils/http-exception";
import { HTTP_STATUS } from "../../shared/http-status-codes";
import { connectionSource } from "../../database/data-source";

class FundraiserRepository {
    private fundraiserRepository = connectionSource.getRepository(Fundraiser);

    public async create(page: Fundraiser): Promise<Fundraiser> {
        return await this.fundraiserRepository.save(page)
    }

    async findByIdOrFail(id: number): Promise<Fundraiser> {
        const page = await this.fundraiserRepository.findOneBy({ id });

        if (!page)
            throw new HttpException(HTTP_STATUS.NOT_FOUND, "Page not found")

        return page
    }

    async findById(id: number, select: FundraiserSelect = null): Promise<Fundraiser> {

        const requiredFields = select?.values ?
            { id: true, ...select.values } :
            { id: true, name: true, goal: true, totalFundsRaised: true };

        const requiredRelations = select?.relations ? {...select.relations} : {}

        return await this.fundraiserRepository.findOne({ where: { id }, select: requiredFields, relations: requiredRelations });
    }

    async getFundraiserById(pageId: number): Promise<Fundraiser> {
        return await this.fundraiserRepository.findOneBy({ id: pageId })
    }

}

export default FundraiserRepository;