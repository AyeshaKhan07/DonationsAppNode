import { connectionSource } from "../database/data-source";
import { HTTP_STATUS } from "../shared/http-status-codes";
import HttpException from "../utils/http-exception";

abstract class BaseService<Entity> {
    protected repository = connectionSource.getRepository<Entity>(this.entity);

    constructor(private entity: { new(): Entity }) { }

    // async findById(id: number, select: FundraiserSelect = null): Promise<Entity> {
    //     const requiredFields = select?.values ?
    //         { id: true, ...select.values } :
    //         { id: true };

    //     const requiredRelations = select?.relations ? { ...select.relations } : {}

    //     return await this.repository.findOne({ where: { id }, select: requiredFields, relations: requiredRelations });
    // }

    // async findByIdOrFail(id: number): Promise<Entity> {
    //     const entity = await this.repository.findOneBy({id});

    //     if (!entity)
    //         throw new HttpException(HTTP_STATUS.NOT_FOUND, `${this.entity.name} not found`);

    //     return entity;
    // }

    async save(data: any): Promise<Entity> {
        return await this.repository.save(data);
    }

    async truncateEntity(): Promise<Boolean> {
        await this.repository.clear();
        const recordsExist = this.repository.find();

        return !recordsExist
    }
}

export default BaseService;