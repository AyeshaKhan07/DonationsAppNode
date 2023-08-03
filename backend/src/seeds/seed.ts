import { endConnection, establishConnection } from '../database';
import { CitySeeder } from './cities.seeder';
import { CountrySeeder } from './country.seeder';
import { CurrencySeeder } from './currency.seeder';
import { DonationSeeder } from './donations.seeder';
import { FundraiserSeeder } from './fundraiser.seeder';
import { PaymentMethodSeeder } from './payment-methods.seeder';
import { UserSeeder } from './users.seeder';

async function seed() {

  await establishConnection();

  try {
    
    console.info('Truncating Tables . . .\n');
    
    await DonationSeeder.clear();
    await FundraiserSeeder.clear();
    await UserSeeder.clear();
    await CitySeeder.clear();
    await CountrySeeder.clear();
    await CurrencySeeder.clear();
    
    console.log("Truncation successful . . .\n");

    console.log("Seeding . . .\n");
    
    await CurrencySeeder.seed();
    await CountrySeeder.seed();
    await CitySeeder.seed();
    await PaymentMethodSeeder.seed();
    await UserSeeder.seed();
    await FundraiserSeeder.seed();
    await DonationSeeder.seed();
    
    console.log("Seeding successful . . .\n");

    await endConnection();

  } catch (error) {
    console.log(error)
    await endConnection();
  }
  return;
}

seed().catch((error) => { console.error('Seeding failed:', error); return });