import { User } from "./user.entity";
import { CreateUserDto } from "../auth/dto";
import HttpException from "../../utils/http-exception";
import { HTTP_STATUS } from "../../shared/http-status-codes";
import { connectionSource } from "../../database/data-source";
import { UpdateUserDto } from "./dto/update-user.dto";

class UserRepository {
    private userRepository = connectionSource.getRepository(User);

    async findByEmail(email: string, withPassword: Boolean = false) {
        const user = await this.userRepository.findOneBy({ email });

        if (user && !withPassword)
            delete user.password

        return user
    }

    async findById(id: number, withPassword: Boolean = false): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });

        if (!user)
            throw new HttpException(HTTP_STATUS.NOT_FOUND, "User not found")

        if (!withPassword)
            delete user.password

        return user
    }

    async fetchAll() {
        return await this.userRepository.find();
    }

    async create(user: CreateUserDto) {
        return await this.userRepository.save(user);
    }

}

export default UserRepository;