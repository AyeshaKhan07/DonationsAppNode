import { User } from "./user.entity";
import { CreateUserDto } from "../auth/dto";
import { UserSelect } from "../../interfaces";
import { generateAccessToken } from "../../utils/jwt";
import HttpException from "../../utils/http-exception";
import BaseService from "../../abstracts/service.abstact";
import { HTTP_STATUS } from "../../shared/http-status-codes";
import { ERROR_MESSAGES } from "../../utils/validation-messages";

class UserService extends BaseService<User> {
    constructor() {
        super(User)
    }

    async findByEmail(email: string, withPassword: Boolean = false) {
        const user = await this.repository.findOneBy({ email });

        if (user && !withPassword)
            delete user.password

        return user
    }

    async findByIdOrFail(id: number, withPassword: Boolean = false): Promise<User> {
        const user = await this.repository.findOneBy({ id });

        if (!user)
            throw new HttpException(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND)

        if (!withPassword)
            delete user.password

        return user
    }

    async findById(id: number, withPassword: boolean = false, select: UserSelect = null): Promise<User> {

        const requiredFields = select?.values ?
            { id: true, ...select.values, password: withPassword } :
            { id: true, password: withPassword };

        const user = await this.repository.findOne({ where: { id }, select: requiredFields, relations: select?.relations });

        return user
    }

    async fetchAll() {
        return await this.repository.find();
    }

    async create(userPayload: CreateUserDto): Promise<{ createdUser: User, accessToken: string }> {
        const newUser = new User();

        newUser.email = userPayload.email
        newUser.contact = userPayload.contact
        newUser.lastName = userPayload.lastName
        newUser.password = userPayload.password
        newUser.firstName = userPayload.firstName

        const createdUser = await this.repository.save(newUser);

        const jwtSignPayload = {
            id: createdUser.id,
            email: createdUser.email
        };
        const accessToken = generateAccessToken(jwtSignPayload);

        return { createdUser, accessToken }
    }

}

export default UserService;