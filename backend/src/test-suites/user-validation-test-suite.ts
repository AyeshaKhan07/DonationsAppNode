import { ValidationTestSuiteInterface } from "../interfaces";

const userValidationTestSuit: ValidationTestSuiteInterface[] = [
    {
        describe: "when missing firstname",
        it: "should return error on firstName",
        data: {
            lastName: "Khan",
            email: "dummyEmail.test@gt.com",
            password: "AyeshaKhan",
            contact: "3647637645"
        },

        toHaveProperties: [
            { key: "firstName" }
        ]
    },

    {
        describe: "when missing firstName and lastName",
        it: "should return error on firstName and lastName",
        data: {
            email: "dummyEmail.test@gt.com",
            password: "AyeshaKhan",
            contact: "3647637645"
        },

        toHaveProperties: [{ key: "firstName" }, { key: "lastName" }]
    },
    {
        describe: "when no value is provided",
        it: "should return errors on all required fields",
        data: {},

        toHaveProperties: [{ key: "firstName" }, { key: "lastName" }, { key: "email" }, { key: "password" }, { key: "contact" }]
    },

]

export default userValidationTestSuit;