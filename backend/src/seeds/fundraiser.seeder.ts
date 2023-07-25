import FundraiserService from '../modules/fundraisers/fundraiser.service';

export class FundraiserSeeder {
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
      
      const service = new FundraiserService();
      return await service.truncateEntity();

    } catch (error) {
      throw error
    }

  }
}