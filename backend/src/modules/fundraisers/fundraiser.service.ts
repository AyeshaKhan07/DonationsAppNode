import { Fundraiser } from "./fundraiser.entity";
import { FundraiserSelect } from "../../interfaces";
import HttpException from "../../utils/http-exception";
import { HTTP_STATUS } from "../../shared/http-status-codes";
import { AssignTeamMembersDto, CreatePageDto } from "./dto";
import { User } from "../users/user.entity";
import UserService from "../users/user.service";
import BaseService from "../../abstracts/service.abstact";
import CityService from "../cities/city.service";
import CountryService from "../countries/country.service";
import fundraisers from "../../seeds/seeders-data/fundraisers-data";
import { ERROR_MESSAGES } from "../../utils/validation-messages";

class FundraiserService extends BaseService<Fundraiser> {

    constructor() {
        super(Fundraiser)
    }

    public async findAll(): Promise<Fundraiser[]> {
        return await this.repository.find();
    }

    public async create(newPagePayload: CreatePageDto, userId: number): Promise<Fundraiser> {
        const newPage = new Fundraiser();
        const cityService = new CityService();
        const userService = new UserService();
        const countryService = new CountryService();
        // const fundraiserService = new FundraiserService();

        const city = await cityService.findByIdOrFail(newPagePayload.city);
        const country = await cityService.getCountryOrFail(newPagePayload.city);
        const currency = await countryService.getCurrencyOrFail(country.id);
        const pageOwner = await userService.findById(userId, false, { values: { firstName: true } });

        if (newPagePayload.id)
            newPage.id = newPagePayload.id

        newPage.city = city;
        newPage.country = country;
        newPage.pageOwner = pageOwner;
        newPage.currency = currency;
        newPage.name = newPagePayload.name;
        newPage.goal = newPagePayload.goal;
        newPage.story = newPagePayload.story;
        newPage.pageType = newPagePayload.pageType;
        newPage.teamPage = newPagePayload.teamMembers?.length ? true : false;

        const teamMembers: User[] = [];

        if (newPagePayload.teamMembers) {

            for (const userId of newPagePayload.teamMembers) {
                const user = await userService.findById(userId);
                
                if (user && user.id !== pageOwner.id)
                    teamMembers.push(user);
            }
        }

        newPage.teamMembers = teamMembers;
        return await this.save(newPage)
    }

    async findByIdOrFail(id: number, select: FundraiserSelect = null): Promise<Fundraiser> {
        const page = await this.getFundraiserById(id, select);

        if (!page)
            throw new HttpException(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.PAGE_NOT_FOUND)

        return page
    }

    async findById(id: number, select: FundraiserSelect = null): Promise<Fundraiser> {
        return await this.getFundraiserById(id, select);
    }

    async getFundraiserById(id: number, select: FundraiserSelect = null): Promise<Fundraiser> {
        const requiredFields = select?.values ?
            { id: true, ...select.values } :
            { id: true, name: true, goal: true, totalFundsRaised: true };

        const requiredRelations = select?.relations ? { ...select.relations } : {}
        return await this.repository.findOne({ where: { id }, select: requiredFields, relations: requiredRelations });
    }

    async assignTeamMembers(payload: AssignTeamMembersDto): Promise<{ updatedFundraiser: Fundraiser, invalidUserIds: User[]; }> {
        const invalidUserIds = [];
        const teamMembers: User[] = [];
        const userService = new UserService();

        const fundraiser = await this.findById(payload.fundraiser, { values: { teamPage: true }, relations: { pageOwner: true, teamMembers: true } });

        if (!fundraiser.teamPage)
            throw new HttpException(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.FUNDRAISER_NOT_TEAM_PAGE);

        if (payload.members.length) {

            for (const userId of payload.members) {
                const user = await userService.findById(userId);

                if (!user)
                    invalidUserIds.push(userId);

                else if (user.id !== fundraiser.pageOwner.id && !teamMembers.find(member => member.id == user.id) && !fundraiser.teamMembers.find(member => member.id == user.id))
                    teamMembers.push(user)
            }

            if (invalidUserIds.length == payload.members.length)
                throw new HttpException(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.PAYLOAD_INVALID_USER_IDS_ARRAY);
        }

        else throw new HttpException(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.PAYLOAD_EMPTY_USER_IDS_ARRAY)

        fundraiser.teamMembers = [...teamMembers, ...fundraiser.teamMembers];

        await this.repository.save(fundraiser);

        const updatedFundraiser = await this.findById(payload.fundraiser, { values: { name: true }, relations: { teamMembers: true } });

        return { updatedFundraiser, invalidUserIds }
    }

    getUserAndTeamPageFromSeeder(): { seederTeamPage: CreatePageDto, seederUserPage: CreatePageDto } {
        let seederTeamPage: CreatePageDto, seederUserPage: CreatePageDto;

        for (const page of fundraisers) {
            if (seederTeamPage && seederUserPage)
                break;

            else if (page.teamMembers.length > 0)
                seederTeamPage = page;

            else seederUserPage = page
        };

        return { seederTeamPage, seederUserPage }

    }

}

export default FundraiserService;