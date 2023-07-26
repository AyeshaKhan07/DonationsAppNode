import DonationService from '../modules/donations/donations.service';
import donations from './seeders-data/donations-data';

export class DonationSeeder {
  public static async seed(): Promise<void> {

    try {

      const service = new DonationService();

      for (const donation of donations) {
        const newDonationPayload = await service.getCompiledNewDonationPayload(donation, donation.user);
        await service.makeDonationSyncedWithUserAndPage(newDonationPayload);
      }

    } catch (error) {
      throw error
    }

  }

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