
import paymentMethods from './seeders-data/payment-methods-data';
import PaymentMethodService from '../modules/payment-methods/payments.service';
import { establishConnection } from '../database';

export class PaymentMethodSeeder {
    public static async seed(): Promise<void> {

        try {

            const service = new PaymentMethodService();
            await service.save(paymentMethods);

        } catch (error) {
            throw error
        }

    }

    public static async clear() {

        try {

            const service = new PaymentMethodService();
            await service.truncateEntity();

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