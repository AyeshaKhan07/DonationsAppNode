import { ValidationTestSuiteInterface } from "../interfaces";

const assignMembersTestSuit: ValidationTestSuiteInterface[] = [
    {
        describe: "when missing fundraiser",
        it: "should return error on fundraiser",
        data: {
            members: [2, 3, 5]
        },

        toHaveProperties: [
            { key: "fundraiser", value: "fundraiser must be a number conforming to the specified constraints" }
        ]
    },

    {
        describe: "when missing members",
        it: "should return error on members",
        data: {
            fundraiser: 23
        },

        toHaveProperties: [
            { key: "members", value: "members must be an array" }
        ]
    },

    {
        describe: "when payload is empty",
        it: "should return error on members and fundraisers",
        data: {},

        toHaveProperties: [
            { key: "members", value: undefined },
            { key: "fundraiser", value: undefined },
        ]
    },

    {
        describe: "when sends invalid page id in payload",
        it: "should return invalid id error fundraisers",
        data: {
            fundraiser: 0
        },

        toHaveProperties: [
            { key: "fundraiser", value: "The page on which your are trying to assign members does not exist" },
        ]
    },

]

export default assignMembersTestSuit;