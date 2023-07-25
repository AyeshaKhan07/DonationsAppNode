import { Fundraiser } from "./fundraiser.entity";
import { FundraiserSelect } from "../../interfaces";
import HttpException from "../../utils/http-exception";
import { HTTP_STATUS } from "../../shared/http-status-codes";
import { AssignTeamMembersDto } from "./dto";
import { User } from "../users/user.entity";
import UserService from "../users/user.service";
import BaseService from "../../abstracts/repository.abstact";

class FundraiserService extends BaseService<Fundraiser> {

    constructor() {
        super(Fundraiser)
    }

    public async findAll(): Promise<Fundraiser[]> {
        return await this.repository.find();
    }

    public async create(page: Fundraiser): Promise<Fundraiser> {
        return await this.repository.save(page)
    }

    async findByIdOrFail(id: number): Promise<Fundraiser> {
        const page = await this.repository.findOneBy({ id });

        if (!page)
            throw new HttpException(HTTP_STATUS.NOT_FOUND, "Page not found")

        return page
    }

    async findById(id: number, select: FundraiserSelect = null): Promise<Fundraiser> {

        const requiredFields = select?.values ?
            { id: true, ...select.values } :
            { id: true, name: true, goal: true, totalFundsRaised: true };

        const requiredRelations = select?.relations ? { ...select.relations } : {}

        return await this.repository.findOne({ where: { id }, select: requiredFields, relations: requiredRelations });
    }

    async getFundraiserById(pageId: number): Promise<Fundraiser> {
        return await this.repository.findOneBy({ id: pageId })
    }

    async assignTeamMembers(payload: AssignTeamMembersDto): Promise<{ updatedFundraiser: Fundraiser, invalidUserIds: User[]; }> {
        const userService = new UserService();

        const teamMembers: User[] = [];
        const invalidUserIds = [];

        if (payload.members.length) {

            for (const userId of payload.members) {
                const user = await userService.findById(userId);
                Boolean(user) ? teamMembers.push(user) : invalidUserIds.push(userId);
            }
        }

        else throw new HttpException(HTTP_STATUS.BAD_REQUEST, "The required array of user IDs in the payload is empty.")

        if (invalidUserIds.length == payload.members.length)
            throw new HttpException(HTTP_STATUS.BAD_REQUEST, "All the user IDs in the payload are invalid.");

        await this.repository.update(payload.fundraiser, { teamMembers: teamMembers })

        const updatedFundraiser = await this.findById(payload.fundraiser, { values: { name: true }, relations: { teamMembers: true } });

        return { updatedFundraiser, invalidUserIds }
    }

}

export default FundraiserService;