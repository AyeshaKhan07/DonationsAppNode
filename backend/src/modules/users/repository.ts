import { User } from "./user.entity";
import { CreateUserDto } from "../auth/dto";
import { UserSelect } from "../../interfaces";
import HttpException from "../../utils/http-exception";
import { HTTP_STATUS } from "../../shared/http-status-codes";
import { connectionSource } from "../../database/data-source";
import { generateAccessToken } from "../../utils/jwt";

class UserRepository {
    private userRepository = connectionSource.getRepository(User);

    async findByEmail(email: string, withPassword: Boolean = false) {
        const user = await this.userRepository.findOneBy({ email });

        if (user && !withPassword)
            delete user.password

        return user
    }

    async findByIdOrFail(id: number, withPassword: Boolean = false): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });

        if (!user)
            throw new HttpException(HTTP_STATUS.NOT_FOUND, "User not found")

        if (!withPassword)
            delete user.password

        return user
    }

    async findById(id: number, withPassword: boolean = false, select: UserSelect = null): Promise<User> {

        const requiredFields = select?.values ?
            { id: true, ...select.values, password: withPassword } :
            { id: true, password: withPassword };

        const user = await this.userRepository.findOne({ where: { id }, select: requiredFields, relations: select?.relations });

        return user
    }

    async fetchAll() {
        return await this.userRepository.find();
    }

    async create(userPayload: CreateUserDto): Promise<{ createdUser: User, accessToken: string }> {
        const newUser = new User();

        newUser.email = userPayload.email
        newUser.contact = userPayload.contact
        newUser.lastName = userPayload.lastName
        newUser.password = userPayload.password
        newUser.firstName = userPayload.firstName

        const createdUser = await this.userRepository.save(newUser);

        const jwtSignPayload = {
            id: createdUser.id,
            email: createdUser.email
        };
        const accessToken = generateAccessToken(jwtSignPayload);

        return { createdUser, accessToken }
    }

}

export default UserRepository;