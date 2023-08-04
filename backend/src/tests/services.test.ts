import { AssignTeamMembersDto } from "../modules/fundraisers/dto";
import FundraiserService from "../modules/fundraisers/fundraiser.service";
import { ERROR_MESSAGES } from "../utils/validation-messages";

describe('Assign team member service', () => {
    const fundraiserService = new FundraiserService();
    const { seederTeamPage, seederUserPage } = fundraiserService.getUserAndTeamPageFromSeeder();

    it('should throw an exception when providing invalid user ids', async () => {

        const payload: AssignTeamMembersDto = {
            fundraiser: seederTeamPage.id,
            members: [0, 0, 0, 0]
        }
        await expect(async () => await fundraiserService.assignTeamMembers(payload)).
            rejects.toThrow(ERROR_MESSAGES.PAYLOAD_INVALID_USER_IDS_ARRAY);
    });

    it('should throw an exception when providing empty array of user ids', async () => {

        const payload: AssignTeamMembersDto = {
            fundraiser: seederTeamPage.id,
            members: []
        }
        await expect(async () => await fundraiserService.assignTeamMembers(payload)).
            rejects.toThrow(ERROR_MESSAGES.PAYLOAD_EMPTY_USER_IDS_ARRAY);
    });

    it('should throw an exception when the page is not team page', async () => {

        const payload: AssignTeamMembersDto = {
            fundraiser: seederUserPage.id,
            members: [4, 5]
        }
        await expect(async () => await fundraiserService.assignTeamMembers(payload)).
            rejects.toThrow(ERROR_MESSAGES.FUNDRAISER_NOT_TEAM_PAGE);
    });

    it('should assign team members when the payload is valid', async () => {
        const updatedTeamMembers = [];

        const payload: AssignTeamMembersDto = {
            fundraiser: 2,
            members: [1, 1, 2, 5]
        }

        const { updatedFundraiser } = await fundraiserService.assignTeamMembers(payload);
        
        updatedFundraiser.teamMembers.map(member => {
            updatedTeamMembers.push(member.id)
        })

        expect(updatedTeamMembers).toEqual([2, 3, 5])
    });

    it('should assign team members when the payload is valid', async () => {
        const updatedTeamMembers = [];

        const payload: AssignTeamMembersDto = {
            fundraiser: 6,
            members: [2, 2, 10, 4, 5]
        }

        const { updatedFundraiser } = await fundraiserService.assignTeamMembers(payload);
        
        updatedFundraiser.teamMembers.map(member => {
            updatedTeamMembers.push(member.id)
        })

        expect(updatedTeamMembers).toEqual([2, 5])
    });

});