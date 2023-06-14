import { Request, Response } from 'express';

import FundraiserRepository from './repository';
import { Fundraiser } from "./fundraiser.entity";
import { HTTP_STATUS } from '../../shared/http-status-codes';
import CityRepository from '../cities/city.repository';
import CountryRepository from '../countries/country.repository';

class FundraiserController {
    static async createPage(req: Request, res: Response) {
        const user = req.user;
        const newPagePayload = req.body;

        const newPage = new Fundraiser();
        const cityRepository = new CityRepository();
        const countryRepository = new CountryRepository();
        const fundraiserRepository = new FundraiserRepository();


        const country = await cityRepository.getCountryOrFail(newPagePayload.city);
        const currency = await countryRepository.getCurrencyOrFail(country.id);

        newPage.user = user.id;
        newPage.country = country;
        newPage.currency = currency;
        newPage.name = newPagePayload.name;
        newPage.goal = newPagePayload.goal;
        newPage.city = newPagePayload.city;
        newPage.story = newPagePayload.story;
        newPage.pageType = newPagePayload.pageType;

        const createdPage = await fundraiserRepository.create(newPage);

        return res.status(HTTP_STATUS.CREATED).send({
            status: HTTP_STATUS.CREATED,
            message: 'Page created',
            createdPage
        });
    }
}

export default FundraiserController;