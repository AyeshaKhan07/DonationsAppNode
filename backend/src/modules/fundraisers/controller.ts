import { Request, Response } from 'express';

import { Fundraiser } from "./fundraiser.entity";
import FundraiserRepository from './repository';
import { HTTP_STATUS } from '../../shared/http-status-codes';

class FundraiserController {
    async createPage(req: Request, res: Response) {
        const user = req.user;
        const newPage = req.body;
        const page = new Fundraiser();
        const repository = new FundraiserRepository();

        page.name = newPage.name;
        page.goal = newPage.goal;
        page.user = user.id;
        page.story = newPage.story;
        page.pageType = newPage.pageType;

        const createdPage = await repository.create(newPage);

        return res.status(HTTP_STATUS.CREATED).send({
            status: HTTP_STATUS.CREATED,
            message: 'Page created',
            createdPage
        });
    }
}

export default FundraiserController;