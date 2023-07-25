import cities from './seeders-data/cities-data';
import CityService from '../modules/cities/city.service';
import DonationService from '../modules/donations/donations.service';

export class DonationSeeder {
//   public static async seed(): Promise<void> {

//     try {

//       const repository = new CityRepository();
//       await repository.save(cities);

//     } catch (error) {
//       throw error
//     }

//   }

  public static async clear(): Promise<Boolean> {

    try {
      
      const service = new DonationService();
      const success = await service.truncateEntity();
      return success

    } catch (error) {
      throw error
    }

  }
}