
import { Country } from "./country.entity";
import { connectionSource } from "../../database/data-source";
import { Currency } from "../currencies/currency.entity";
import HttpException from "../../utils/http-exception";
import { HTTP_STATUS } from "../../shared/http-status-codes";

class CountryRepository {
    private countryRepository = connectionSource.getRepository(Country);
    
    async findByIdOrFail(id: number): Promise<Country> {
        return await this.countryRepository.findOneByOrFail({ id })
    }

    async getCurrencyOrFail(countryId: number): Promise<Currency> {
        const country = await this.countryRepository.findOne({ where: { id: countryId }, relations: { currency: true } });

        if (!country)
            throw new HttpException(HTTP_STATUS.NOT_FOUND, "Country not found")

        return country.currency;
    }
    
    async save(data: any): Promise<void> {
        return await this.countryRepository.save(data);
    }

    async truncate(): Promise<void> {
        return await this.countryRepository.clear();
    }

}

export default CountryRepository;