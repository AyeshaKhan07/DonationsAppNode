import DonationService from '../modules/donations/donations.service';
import donations from './seeders-data/donations-data';
import { getValidationErrors } from '../middlewares/validate-request';
import { CreateDonationDto } from '../modules/donations/dto/create-donation.dto';

export class DonationSeeder {
  public static async seed(): Promise<void> {

    try {

      const service = new DonationService();

      for (const donation of donations) {
        const errors = await getValidationErrors(donation, CreateDonationDto)

        if (Object.keys(errors).length) {
          console.log('validation failed on object: \n', donation);
          console.log('validation failed errors: \n', errors);
          throw new Error("Validation failed");
        }

        else {
          const newDonationPayload = await service.getCompiledNewDonationPayload(donation, donation.user);
          await service.makeDonationSyncedWithUserAndPage(newDonationPayload);
        }
      }

    } catch (error) {
      throw error
    }

  }

  public static async clear() {

    try {

      const service = new DonationService();
      await service.truncateEntity();

    } catch (error) {
      throw error
    }

  }
}