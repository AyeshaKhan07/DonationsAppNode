import { AssignTeamMembersDto } from "../modules/fundraisers/dto";
import FundraiserService from "../modules/fundraisers/fundraiser.service";

describe('Assign team member service', () => {
    it('should throw an exception when providing invalid user ids', async () => {

        const fundraiserService = new FundraiserService();
        const fundraisers = await fundraiserService.findAll();
        const validFundraiserId = fundraisers[0].id;

        const payload: AssignTeamMembersDto = {
            fundraiser: validFundraiserId,
            members: [0, 0, 0, 0]
        }
        await expect(async () => await fundraiserService.assignTeamMembers(payload)).
            rejects.toThrow("All the user IDs in the payload are invalid.");
    });

    it('should throw an exception when providing empty array of user ids', async () => {

        const fundraiserService = new FundraiserService();
        const fundraisers = await fundraiserService.findAll();
        const validFundraiserId = fundraisers[0].id;

        const payload: AssignTeamMembersDto = {
            fundraiser: validFundraiserId,
            members: []
        }
        await expect(async () => await fundraiserService.assignTeamMembers(payload)).
            rejects.toThrow("The required array of user IDs in the payload is empty.");
    });

});