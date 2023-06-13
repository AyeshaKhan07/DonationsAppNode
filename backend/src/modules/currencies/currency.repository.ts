
import { connectionSource } from "../../database/data-source";
import { Currency } from "./currency.entity";

class CurrencyRepository {
    private currencyRepository = connectionSource.getRepository(Currency);

    async findByIdOrFail(id: number): Promise<Currency> {
        return await this.currencyRepository.findOneByOrFail({ id })
    }

    async save(data: any): Promise<void> {
        return await this.currencyRepository.save(data);
    }

    async truncate(): Promise<void> {
        return await this.currencyRepository.clear();
    }

}

export default CurrencyRepository;