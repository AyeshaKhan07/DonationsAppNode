import { AssignTeamMembersDto } from "../modules/fundraisers/dto";
import FundraiserRepository from "../modules/fundraisers/repository";

describe('Assign team member service',() => {
    it('should throw an exception when providing invalid user ids', async () => {

        const fundraiserRepository = new FundraiserRepository();
        const payload: AssignTeamMembersDto = {
            fundraiser: 2,
            members: [0, 0, 0, 0]
        }
        await expect(async () => await fundraiserRepository.assignTeamMembers(payload)).
            rejects.toThrow("All the user IDs in the payload are invalid.");
        });

    // it('should return the correct result when dividing two numbers', () => {
    //     expect(divide(10, 2)).toBe(5);
    // });
});