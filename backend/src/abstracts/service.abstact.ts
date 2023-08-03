import { connectionSource } from "../database/data-source";

abstract class BaseService<Entity> {
    protected repository = connectionSource.getRepository<Entity>(this.entity);

    constructor(private entity: { new(): Entity }) { }

    async save(data: any): Promise<Entity> {
        return await this.repository.save(data);
    }

    async truncateEntity() {
        return await this.repository.clear();
        // const recordsExist = await this.repository.find();

        // if(recordsExist.length)
        //     throw new Error("Truncating not successful")

        // else return true
    }
}

export default BaseService;