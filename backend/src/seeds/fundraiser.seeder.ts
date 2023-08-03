import { connectionSource } from '../database/data-source';
import FundraiserService from '../modules/fundraisers/fundraiser.service';
import fundraisers from './seeders-data/fundraisers-data';
import { getValidationErrors } from '../middlewares/validate-request';
import { CreatePageDto } from '../modules/fundraisers/dto';

export class FundraiserSeeder {
  public static async seed(): Promise<void> {

    try {

      const service = new FundraiserService();

      for (const fundraiser of fundraisers) {
        const errors = await getValidationErrors(fundraiser, CreatePageDto)

        if (Object.keys(errors).length)
          {
            console.log('validation failed. errors: ', errors);
            break;
          }

        else await service.create(fundraiser, fundraiser.pageOwner);
      }

    } catch (error) {
      throw error
    }

  }

  public static async clear() {

    try {

      await connectionSource.manager.query('Delete from users_pages_fundraisers');
      await connectionSource.manager.query('Delete from fundraisers');

    } catch (error) {
      throw error
    }

  }
}