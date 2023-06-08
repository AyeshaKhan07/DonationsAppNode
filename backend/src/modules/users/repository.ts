import { User } from "./user.entity";
import { connectionSource } from "../../database/data-source";
import { CreateUserDto } from "../auth/dto";
import HttpException from "../../utils/http-exception";
import { HTTP_STATUS } from "../../shared/http-status-codes";

const userRepository = connectionSource.getRepository(User);

export default {
    async findByEmail(email: string) {
        return await userRepository.findOneBy({ email });
    },

    async findById(id: number, withPassword: Boolean = false): Promise<User> {
        const user = await userRepository.findOneBy({ id });

        if (!user)
            throw new HttpException(HTTP_STATUS.NOT_FOUND, "User not found")

        if (!withPassword)
            delete user.password

        return user
    },

    async fetchAll() {
        return await userRepository.find();
    },

    async create(user: CreateUserDto) {
        return await userRepository.save(user);
    }
}