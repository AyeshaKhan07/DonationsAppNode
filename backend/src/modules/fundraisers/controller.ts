import { Request, Response } from 'express';

import { Fundraiser } from "./fundraiser.entity";
import FundraiserRepository from './repository';
import { HTTP_STATUS } from '../../shared/http-status-codes';

class FundraiserController {
    
    async createPage(req: Request, res: Response) {
        
        try {
            const newPage = req.body;
            const page = new Fundraiser();
            const repository = new FundraiserRepository();
    
            page.name = newPage.name;
            page.goal = newPage.goal;
            page.user = newPage.user;
            page.story = newPage.story;
            page.pageType = newPage.pageType;

            const createdPage = await repository.create(newPage);

            res.send({
                status: HTTP_STATUS.CREATED,
                message: 'Page created',
                createdPage
            })
        } catch (error) {
            console.log(error)
            
            res.send({
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong',
                error
            })
        }
    }
}

export default FundraiserController;