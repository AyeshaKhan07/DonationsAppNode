
import { Country } from "./country.entity";
import { connectionSource } from "../../database/data-source";

class CountryRepository {
    private countryRepository = connectionSource.getRepository(Country);

    async save(data: any): Promise<void> {
        return await this.countryRepository.save(data);
    }

    async truncate(): Promise<void> {
        return await this.countryRepository.clear();
    }

}

export default CountryRepository;