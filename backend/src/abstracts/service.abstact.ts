import { connectionSource } from "../database/data-source";

abstract class BaseService<Entity> {
    protected repository = connectionSource.getRepository<Entity>(this.entity);

    constructor(private entity: { new(): Entity }) { }

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