import cities from './seeders-data/cities-data';
import CityRepository from '../modules/cities/city.repository';

export class CitySeeder {
  public static async seed(): Promise<void> {

    try {

      const repository = new CityRepository();
      await repository.save(cities);

    } catch (error) {
      throw error
    }

  }

  public static async clear(): Promise<void> {

    try {
      
      const repository = new CityRepository();
      await repository.truncate();

    } catch (error) {
      throw error
    }

  }
}