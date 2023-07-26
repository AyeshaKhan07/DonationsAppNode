import UserService from '../modules/users/user.service';
import users from './seeders-data/users-data';

export class UserSeeder {
    public static async seed(): Promise<void> {

        try {

            const service = new UserService();
            await service.save(users);

        } catch (error) {
            throw error
        }

    }

    public static async clear(): Promise<Boolean> {

        try {

            const service = new UserService();
            return await service.truncateEntity();

        } catch (error) {
            throw error
        }

    }
}