import { CreatePageDto } from "../../modules/fundraisers/dto";

const fundraisers: CreatePageDto[] = [
    {
        id: 1,
        name: "Page1",
        goal: 2000,
        pageType: 1,
        pageOwner: 2,
        story: "story must be a string",
        city: 1,
        teamMembers: []
    },
    {
        id: 2,
        name: "Page2",
        goal: 5000,
        pageType: 2,
        pageOwner: 1,
        story: "ABCSDSA",
        city: 1,
        teamMembers: [1, 3, 5]
    },{
        id: 3,
        name: "Page3",
        goal: 50000,
        pageType: 1,
        pageOwner: 5,
        story: "ABCSDSA",
        city: 1,
        teamMembers: []
    },{
        id: 4,
        name: "Page4",
        goal: 7000,
        pageType: 1,
        pageOwner: 3,
        story: "ABCSDSA",
        city: 1,
        teamMembers: []
    },{
        id: 5,
        name: "Page5",
        goal: 50005432,
        pageType: 2,
        pageOwner: 3,
        story: "ABCSDSA",
        city: 1,
        teamMembers: []
    },{
        id: 6,
        name: "Page6",
        goal: 9000,
        pageType: 1,
        pageOwner: 4,
        story: "ABCSDSA",
        city: 1,
        teamMembers: [2, 4]
    },{
        id: 7,
        name: "Page7",
        goal: 5000,
        pageType: 1,
        pageOwner: 1,
        story: "ABCSDSA",
        city: 1,
        teamMembers: []
    },{
        id: 8,
        name: "Page8",
        goal: 50000,
        pageType: 2,
        pageOwner: 2,
        story: "ABCSDSA",
        city: 1,
        teamMembers: [1, 5]
    },{
        id: 9,
        name: "Page9",
        goal: 8000,
        pageType: 1,
        pageOwner: 5,
        story: "ABCSDSA",
        city: 1,
        teamMembers: [4, 5]
    },{
        id: 10,
        name: "Page10",
        goal: 5000,
        pageType: 1,
        pageOwner: 3,
        story: "ABCSDSA",
        city: 1,
        teamMembers: [1, 3]
    },{
        id: 11,
        name: "Page11",
        goal: 5000,
        pageType: 1,
        pageOwner: 4,
        story: "ABCSDSA",
        city: 1,
        teamMembers: [1, 2, 3, 5]
    },
]

export default fundraisers;