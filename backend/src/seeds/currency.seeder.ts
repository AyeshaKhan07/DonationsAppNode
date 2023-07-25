import CurrencyService from '../modules/currencies/currency.service';
import currencies from './seeders-data/currencies-data';

export class CurrencySeeder {
  public static async seed(): Promise<void> {

    try {
      
      const service = new CurrencyService();
      await service.save(currencies);

    } catch (error) {
      throw error
    }

  }

  public static async clear(): Promise<Boolean> {

    try {
      
      const service = new CurrencyService();
      return await service.truncateEntity();

    } catch (error) {
      throw error
    }

  }
}