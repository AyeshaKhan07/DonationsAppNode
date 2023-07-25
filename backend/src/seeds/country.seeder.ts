import countries from './seeders-data/countries-data';
import CountryService from '../modules/countries/country.service';

export class CountrySeeder {
  public static async seed(): Promise<void> {

    try {
      
      const service = new CountryService();
      await service.save(countries);

    } catch (error) {
      throw error
    }

  }

  public static async clear(): Promise<Boolean> {

    try {
      
      const service = new CountryService();
      return await service.truncateEntity();

    } catch (error) {
      throw error
    }

  }
}