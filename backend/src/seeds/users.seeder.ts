import users from './seeders-data/users-data';
import UserService from '../modules/users/user.service';
import { connectionSource } from '../database/data-source';

export class UserSeeder {
    public static async seed(): Promise<void> {

        try {

            const service = new UserService();
            await service.save(users);

        } catch (error) {
            throw error
        }

    }

    public static async clear() {

        try {
            await connectionSource.manager.query('Delete from users');

        } catch (error) {
            throw error
        }

    }
}