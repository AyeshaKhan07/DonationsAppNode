import cities from './seeders-data/cities-data';
import CityService from '../modules/cities/city.service';
import { connectionSource } from '../database/data-source';

export class CitySeeder {
  public static async seed(): Promise<void> {

    try {

      const service = new CityService();
      await service.save(cities);

    } catch (error) {
      throw error
    }

  }

  public static async clear() {

    try {
      
      await connectionSource.manager.query('Delete from cities');

    } catch (error) {
      throw error
    }

  }
}