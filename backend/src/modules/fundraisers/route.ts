import { Router, RequestHandler } from 'express';

import { AssignTeamMembersDto, CreatePageDto } from "./dto";
import FundraiserController from "./controller";
import Route from "../../abstracts/router.abstract";
import VanillaController from "../../utils/controller-wrapper";
import { validateRequest } from "../../middlewares/validate-request";

class FundraiserRouter extends Route {

    private wrappedCreatePage: RequestHandler;
    private wrappedAssignTeamMember: RequestHandler;

    wrapControllers() {
        this.wrappedCreatePage = VanillaController.wrap(FundraiserController.createPage);
        this.wrappedAssignTeamMember = VanillaController.wrap(FundraiserController.assignMembers);
    }

    initializeControllers(router: Router) {
        const fundraiserPagesRoute = Router();
        
        fundraiserPagesRoute.route('/')
            .post(validateRequest(CreatePageDto), this.wrappedCreatePage)
            
        fundraiserPagesRoute.post('/assign-members', validateRequest(AssignTeamMembersDto), this.wrappedAssignTeamMember);

        router.use('/fundraiser-pages', fundraiserPagesRoute);

    }
}

export default FundraiserRouter;