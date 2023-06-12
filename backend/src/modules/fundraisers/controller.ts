import { Request, Response } from 'express';

import FundraiserRepository from './repository';
import { Fundraiser } from "./fundraiser.entity";
import { HTTP_STATUS } from '../../shared/http-status-codes';

class FundraiserController {
    static async createPage(req: Request, res: Response) {
        const user = req.user;
        const newPagePayload = req.body;
        const newPage = new Fundraiser();
        const repository = new FundraiserRepository();

        newPage.name = newPagePayload.name;
        newPage.goal = newPagePayload.goal;
        newPage.user = user.id;
        newPage.story = newPagePayload.story;
        newPage.pageType = newPagePayload.pageType;

        const createdPage = await repository.create(newPage);

        return res.status(HTTP_STATUS.CREATED).send({
            status: HTTP_STATUS.CREATED,
            message: 'Page created',
            createdPage
        });
    }
}

export default FundraiserController;