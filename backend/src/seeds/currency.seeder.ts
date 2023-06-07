import CurrencyRepository from '../modules/currencies/currency.repository';
import currencies from './seeders-data/currencies-data';

export class CurrencySeeder {
  public static async seed(): Promise<void> {

    try {
      
      const repository = new CurrencyRepository();
      await repository.save(currencies);

    } catch (error) {
      throw error
    }

  }

  public static async clear(): Promise<void> {

    try {
      
      const repository = new CurrencyRepository();
      await repository.truncate();

    } catch (error) {
      throw error
    }

  }
}