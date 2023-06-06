import HttpException from "../../utils/http-exception";
import { HTTP_STATUS } from "../../shared/http-status-codes";
import { connectionSource } from "../../database/data-source";
import { City } from "./city.entity";

class CityRepository {
    private cityRepository = connectionSource.getRepository(City);

    // public async create(page: CreatePageDto) {
    //     return await this.paymentMethodRepository.save(page)
    // }

    async findById(id: number) {
        const city = await this.cityRepository.findOneBy({ id });

        if (!city)
            throw new HttpException(HTTP_STATUS.NOT_FOUND, "City not found")

        return city
    }

    async save(data: any) {
        return await this.cityRepository.save(data);
    }

}

export default CityRepository;