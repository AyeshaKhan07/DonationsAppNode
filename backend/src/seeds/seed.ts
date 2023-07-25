import { endConnection, establishConnection } from '../database';
import { CitySeeder } from './cities.seeder';
import { CountrySeeder } from './country.seeder';
import { CurrencySeeder } from './currency.seeder';
import { DonationSeeder } from './donations.seeder';
import { FundraiserSeeder } from './fundraiser.seeder';
import { PaymentMethodSeeder } from './payment-methods.seeder';

async function seed() {

  await establishConnection();

  console.info('Truncating Tables . . .\n');
  const donationsTruncated = await DonationSeeder.clear();
  let fundraisersTruncated: Boolean, citiesTruncated: Boolean, countriesTruncated: Boolean, currenciesTruncated: Boolean;

  if(donationsTruncated) fundraisersTruncated = await FundraiserSeeder.clear();

  if(fundraisersTruncated) citiesTruncated = await CitySeeder.clear();

  if(citiesTruncated) countriesTruncated = await CountrySeeder.clear();
  
  if(currenciesTruncated) currenciesTruncated = await CurrencySeeder.clear();

  console.info('Seeding Database . . .\n');

  await CurrencySeeder.seed();
  await CountrySeeder.seed();
  await CitySeeder.seed();
  await PaymentMethodSeeder.seed();

  console.log('Seeding completed successfully!\n');

  await endConnection();

  return;
}

seed().catch((error) => { console.error('Seeding failed:', error); return });