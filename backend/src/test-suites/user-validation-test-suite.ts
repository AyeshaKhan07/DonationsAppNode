import { ValidationTestSuiteInterface } from "../interfaces";

const userValidationTestSuit: ValidationTestSuiteInterface[] = [
    {
        useCase: "when missing firstname",
        expected: "should return error on firstName",
        payload: {
            lastName: "Khan",
            email: "dummyEmail.test@gt.com",
            password: "AyeshaKhan",
            contact: "3647637645"
        },

        expectedResult: [
            { key: "firstName", value: undefined }
        ]
    },

    {
        useCase: "when missing firstName and lastName",
        expected: "should return error on firstName and lastName",
        payload: {
            email: "dummyEmail.test@gt.com",
            password: "AyeshaKhan",
            contact: "3647637645"
        },

        expectedResult: [{ key: "firstName", value: undefined }, { key: "lastName", value: undefined }]
    },
    {
        useCase: "when no value is provided",
        expected: "should return errors on all required fields",
        payload: {},

        expectedResult: [{ key: "firstName", value: undefined }, { key: "lastName", value: undefined }, { key: "email", value: undefined }, { key: "password", value: undefined }, { key: "contact", value: undefined }]
    },

]

export default userValidationTestSuit;