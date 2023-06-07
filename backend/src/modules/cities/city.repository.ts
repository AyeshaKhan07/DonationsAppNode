import HttpException from "../../utils/http-exception";
import { HTTP_STATUS } from "../../shared/http-status-codes";
import { connectionSource } from "../../database/data-source";
import { City } from "./city.entity";

class CityRepository {
    private cityRepository = connectionSource.getRepository(City);

    async findById(id: number): Promise<City> {
        const city = await this.cityRepository.findOneBy({ id });

        if (!city)
            throw new HttpException(HTTP_STATUS.NOT_FOUND, "City not found")

        return city
    }

    async save(data: any): Promise<void> {
        return await this.cityRepository.save(data);
    }

    async truncate(): Promise<void> {
        return await this.cityRepository.clear();
    }

}

export default CityRepository;