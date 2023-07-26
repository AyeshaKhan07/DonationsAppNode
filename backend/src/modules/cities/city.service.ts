import HttpException from "../../utils/http-exception";
import { HTTP_STATUS } from "../../shared/http-status-codes";
import { connectionSource } from "../../database/data-source";
import { City } from "./city.entity";
import { Country } from "../countries/country.entity";
import BaseService from "../../abstracts/service.abstact";

class CityService extends BaseService<City> {

    constructor() {
        super(City)
    }
    
    async findById(id: number): Promise<City> {
        return await this.repository.findOneBy({ id });
    }
    
    async findByIdOrFail(id: number): Promise<City> {
        const city = await this.repository.findOneBy({ id });

        if (!city)
            throw new HttpException(HTTP_STATUS.NOT_FOUND, "City not found")

        return city
    }

    async getCountryOrFail(cityId: number): Promise<Country> {
        const city = await this.repository.findOne({ where: { id: cityId }, relations: { country: true }, select: {id: true} });

        if (!city)
            throw new HttpException(HTTP_STATUS.NOT_FOUND, "City not found")

        return city.country;
    }

}

export default CityService;