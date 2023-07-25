
import { Country } from "./country.entity";
import { Currency } from "../currencies/currency.entity";
import HttpException from "../../utils/http-exception";
import { HTTP_STATUS } from "../../shared/http-status-codes";
import BaseService from "../../abstracts/repository.abstact";

class CountryService extends BaseService<Country> {
    constructor() {
        super(Country)
    }

    async findByIdOrFail(id: number): Promise<Country> {
        return await this.repository.findOneByOrFail({ id })
    }

    async getCurrencyOrFail(countryId: number): Promise<Currency> {
        const country = await this.repository.findOne({ where: { id: countryId }, relations: { currency: true } });

        if (!country)
            throw new HttpException(HTTP_STATUS.NOT_FOUND, "Country not found")

        return country.currency;
    }

}

export default CountryService;