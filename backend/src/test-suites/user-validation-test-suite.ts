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
            { key: "firstName", value: undefined }
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

        toHaveProperties: [{ key: "firstName", value: undefined }, { key: "lastName", value: undefined }]
    },
    {
        describe: "when no value is provided",
        it: "should return errors on all required fields",
        data: {},

        toHaveProperties: [{ key: "firstName", value: undefined }, { key: "lastName", value: undefined }, { key: "email", value: undefined }, { key: "password", value: undefined }, { key: "contact", value: undefined }]
    },

]

export default userValidationTestSuit;