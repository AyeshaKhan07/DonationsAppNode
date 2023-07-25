import cities from './seeders-data/cities-data';
import CityService from '../modules/cities/city.service';

export class CitySeeder {
  public static async seed(): Promise<void> {

    try {

      const service = new CityService();
      await service.save(cities);

    } catch (error) {
      throw error
    }

  }

  public static async clear(): Promise<Boolean> {

    try {
      
      const service = new CityService();
      return await service.truncateEntity();

    } catch (error) {
      throw error
    }

  }
}