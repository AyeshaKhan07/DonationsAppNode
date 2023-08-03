import { connectionSource } from '../database/data-source';
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

  public static async clear() {

    try {
      
      await connectionSource.manager.query('Delete from currencies');

    } catch (error) {
      throw error
    }

  }
}