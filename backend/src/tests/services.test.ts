import { AssignTeamMembersDto } from "../modules/fundraisers/dto";
import FundraiserService from "../modules/fundraisers/fundraiser.service";

describe('Assign team member service', () => {
    it('should throw an exception when providing invalid user ids', async () => {

        const fundraiserService = new FundraiserService();

        const payload: AssignTeamMembersDto = {
            fundraiser: 2,
            members: [0, 0, 0, 0]
        }
        await expect(async () => await fundraiserService.assignTeamMembers(payload)).
            rejects.toThrow("All the user IDs in the payload are invalid.");
    });

    it('should throw an exception when providing empty array of user ids', async () => {

        const fundraiserService = new FundraiserService();

        const payload: AssignTeamMembersDto = {
            fundraiser: 2,
            members: []
        }
        await expect(async () => await fundraiserService.assignTeamMembers(payload)).
            rejects.toThrow("The required array of user IDs in the payload is empty.");
    });

    it('should throw an exception when the page is not team page', async () => {

        const fundraiserService = new FundraiserService();

        const payload: AssignTeamMembersDto = {
            fundraiser: 3,
            members: [4, 5]
        }
        await expect(async () => await fundraiserService.assignTeamMembers(payload)).
            rejects.toThrow("This fundraiser is not a team page");
    });

});