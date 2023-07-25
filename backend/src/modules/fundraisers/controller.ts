import { Request, Response } from 'express';

import { CreatePageDto } from './dto';
import { User } from '../users/user.entity';
import FundraiserService from './fundraiser.service';
import UserService from '../users/user.service';
import { Fundraiser } from "./fundraiser.entity";
import CityService from '../cities/city.service';
import { HTTP_STATUS } from '../../shared/http-status-codes';
import CountryService from '../countries/country.service';

class FundraiserController {
    static async createPage(req: Request, res: Response) {
        const user = req.user;
        const newPagePayload: CreatePageDto = req.body;

        const newPage = new Fundraiser();
        const cityService = new CityService();
        const userService = new UserService();
        const countryService = new CountryService();
        const fundraiserService = new FundraiserService();

        const city = await cityService.findByIdOrFail(newPagePayload.city);
        const country = await cityService.getCountryOrFail(newPagePayload.city);
        const currency = await countryService.getCurrencyOrFail(country.id);

        newPage.city = city;
        newPage.country = country;
        newPage.pageOwner = user.id;
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
                teamMembers.push(user);
            }
        }

        newPage.teamMembers = teamMembers;

        const createdPage = await fundraiserService.create(newPage);

        return res.status(HTTP_STATUS.CREATED).send({
            status: HTTP_STATUS.CREATED,
            message: 'Page created',
            createdPage
        });
    }

    static async assignMembers(req: Request, res: Response) {
        const fundraiserService = new FundraiserService();

        const { updatedFundraiser, invalidUserIds } = await fundraiserService.assignTeamMembers(req.body);

        return res.status(HTTP_STATUS.OK).send({
            status: HTTP_STATUS.OK,
            message: 'All the team members are assigned' + invalidUserIds.length ? `except id(s): ${invalidUserIds.join(",")}` : null,
            fundraiser: updatedFundraiser
        });
    }
}

export default FundraiserController;