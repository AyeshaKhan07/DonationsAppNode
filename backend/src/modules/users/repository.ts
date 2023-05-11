import { User } from "./user.entity";
import { connectionSource } from "../../database/data-source";
import { CreateUserDto } from "../auth/dto";

const userRepository = connectionSource.getRepository(User);

export default {
    async findByEmail(email: string) {
        return await userRepository.findOneBy({ email });
    },

    async findById(id: number) {
        return await userRepository.findOneBy({ id });
    },

    async fetchAll() {
        return await userRepository.find();
    },

    async create(user: CreateUserDto) {
        return await userRepository.save(user);
    }
}