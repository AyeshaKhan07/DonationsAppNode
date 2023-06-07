import countries from './seeders-data/countries-data';
import CountryRepository from '../modules/countries/country.repository';

export class CountrySeeder {
  public static async seed(): Promise<void> {

    try {
      
      const repository = new CountryRepository();
      await repository.save(countries);

    } catch (error) {
      throw error
    }

  }

  public static async clear(): Promise<void> {

    try {
      
      const repository = new CountryRepository();
      await repository.truncate();

    } catch (error) {
      throw error
    }

  }
}