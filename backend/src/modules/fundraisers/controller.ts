import { Request, Response } from 'express';

import FundraiserService from './fundraiser.service';
import { HTTP_STATUS } from '../../shared/http-status-codes';

class FundraiserController {
    static async createPage(req: Request, res: Response) {
        const fundraiserService = new FundraiserService();

        const createdPage = await fundraiserService.create(req.body, req["user"].id);

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