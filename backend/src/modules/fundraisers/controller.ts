import { Request, Response } from 'express';

import FundraiserRepository from './repository';
import { Fundraiser } from "./fundraiser.entity";
import { HTTP_STATUS } from '../../shared/http-status-codes';
import CityRepository from '../cities/city.repository';
import CountryRepository from '../countries/country.repository';
import { CreatePageDto } from './dto';
import { User } from '../users/user.entity';
import UserRepository from '../users/repository';

class FundraiserController {
    static async createPage(req: Request, res: Response) {
        const user = req.user;
        const newPagePayload: CreatePageDto = req.body;

        const newPage = new Fundraiser();
        const cityRepository = new CityRepository();
        const userRepository = new UserRepository();
        const countryRepository = new CountryRepository();
        const fundraiserRepository = new FundraiserRepository();

        const city = await cityRepository.findByIdOrFail(newPagePayload.city);
        const country = await cityRepository.getCountryOrFail(newPagePayload.city);
        const currency = await countryRepository.getCurrencyOrFail(country.id);

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
                const user = await userRepository.findById(userId);
                teamMembers.push(user);
            }
        }
        
        newPage.teamMembers = teamMembers;

        const createdPage = await fundraiserRepository.create(newPage);

        return res.status(HTTP_STATUS.CREATED).send({
            status: HTTP_STATUS.CREATED,
            message: 'Page created',
            createdPage
        });
    }
}

export default FundraiserController;