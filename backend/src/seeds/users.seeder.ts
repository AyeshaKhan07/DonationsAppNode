import users from './seeders-data/users-data';
import UserService from '../modules/users/user.service';
import { connectionSource } from '../database/data-source';
import { getValidationErrors } from '../middlewares/validate-request';
import { CreateUserDto } from '../modules/auth/dto';

export class UserSeeder {
    public static async seed(): Promise<void> {

        try {

            const service = new UserService();
            
            for (const user of users) {
                const errors = await getValidationErrors(user, CreateUserDto)

                if (Object.keys(errors).length) {
                    console.log('validation failed. errors: ', errors);
                    break;
                }

                else await service.create(user);
            }

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