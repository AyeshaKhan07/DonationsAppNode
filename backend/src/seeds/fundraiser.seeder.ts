import FundraiserService from '../modules/fundraisers/fundraiser.service';
import fundraisers from './seeders-data/fundraisers-data';

export class FundraiserSeeder {
  public static async seed(): Promise<void> {

    try {

      const service = new FundraiserService();

      for (const fundraiser of fundraisers) {

        await service.create(fundraiser, fundraiser.pageOwner);
      }

    } catch (error) {
      throw error
    }

  }

  public static async clear(): Promise<Boolean> {

    try {
      
      const service = new FundraiserService();
      return await service.truncateEntity();

    } catch (error) {
      throw error
    }

  }
}