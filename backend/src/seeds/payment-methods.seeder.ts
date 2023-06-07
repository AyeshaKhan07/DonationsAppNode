
import paymentMethods from './seeders-data/payment-methods-data';
import PaymentMethodRepository from '../modules/payment-methods/payments.repository';
import { establishConnection } from '../database';

export class PaymentMethodSeeder {
    public static async seed(): Promise<void> {

        try {

            const repository = new PaymentMethodRepository();
            await repository.save(paymentMethods);

        } catch (error) {
            throw error
        }

    }

    public static async clear(): Promise<void> {

        try {

            const repository = new PaymentMethodRepository();
            await repository.truncate();

        } catch (error) {
            throw error
        }

    }

}

const command = process.argv[2];
if (command === 'seed') {
    try {
        establishConnection()
        .then(() => {
            console.log('\n Seeding payment methods. . .\n');
            PaymentMethodSeeder.seed()
            .then(() => {
                console.log('Seeding completed successfully\n');
                return
            })
        })
    } catch (error) {
        console.error('Seeding failed:', error);
    }
}