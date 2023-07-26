
import BaseService from "../../abstracts/service.abstact";
import { connectionSource } from "../../database/data-source";
import { Currency } from "./currency.entity";

class CurrencyService extends BaseService<Currency> {

    constructor() {
        super(Currency);
    }

    async findByIdOrFail(id: number): Promise<Currency> {
        return await this.repository.findOneByOrFail({ id })
    }

}

export default CurrencyService;