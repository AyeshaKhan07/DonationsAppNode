import { Request, Response } from 'express';

import { Fundraiser } from "./fundraiser.entity";
import FundraiserRepository from './repository';
import { HTTP_STATUS } from '../../shared/http-status-codes';

class FundraiserController {
    private page = new Fundraiser();
    private repository = new FundraiserRepository();

    async createPage(req: Request, res: Response) {
        const newPage = req.body;

        this.page.name = newPage.name;
        this.page.goal = newPage.goal;
        this.page.user = newPage.user;
        this.page.story = newPage.story;
        this.page.pageType = newPage.pageType;

        try {
            const createdPage = await this.repository.create(newPage);

            res.send({
                status: HTTP_STATUS.CREATED,
                message: 'Page created',
                createdPage
            })
        } catch (error) {

            res.send({
                error
            })
        }
    }
}

export default FundraiserController;