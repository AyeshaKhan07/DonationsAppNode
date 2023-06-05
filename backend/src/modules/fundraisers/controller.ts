import { Request, Response } from 'express';

import UserRepository from "../users/repository";
import FundraiserRepository from './repository';
import { Fundraiser } from "./fundraiser.entity";
import { HTTP_STATUS } from '../../shared/http-status-codes';

class FundraiserController {
    async createPage(req: Request, res: Response) {
        const user = req.user;
        const newPagePayload = req.body;
        const newPage = new Fundraiser();
        const repository = new FundraiserRepository();

        const User = await UserRepository.findById(user.id);

        newPage.name = newPagePayload.name;
        newPage.goal = newPagePayload.goal;
        newPage.user = User;
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