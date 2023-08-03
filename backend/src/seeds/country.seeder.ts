import countries from './seeders-data/countries-data';
import CountryService from '../modules/countries/country.service';
import { connectionSource } from '../database/data-source';

export class CountrySeeder {
  public static async seed(): Promise<void> {

    try {
      
      const service = new CountryService();
      await service.save(countries);

    } catch (error) {
      throw error
    }

  }

  public static async clear() {

    try {
      
      await connectionSource.manager.query('Delete from countries');

    } catch (error) {
      throw error
    }

  }
}