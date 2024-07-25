import { emailRegex } from "../constants";
import { IValidationReturns, IValidationRules, IValidationSchema } from "../types/validation-schemas.types";

export const SigninSchema: IValidationSchema = {
    email: {
        required: true,
        type: "email",
        errorMessages: {
            required: "Email is required"
        }
    },
    password: {
        required: true,
        type: "string"
    }
}

function validate(schema: IValidationSchema, data: any) {
    const errors: any = {};
    
    for (const key of Object.keys(data)) {
        const validationRules = { ...schema[key] }
        const { pass, errorMessage } = validateObject(validationRules, data[key]);
        errors[key] = pass ? undefined : errorMessage
    }
}

function validateObject(validationRules: IValidationRules, value: any): IValidationReturns {

    for (const key of Object.keys(validationRules) as (keyof IValidationRules)[]) {
        switch (key) {
            case "required":
                if (validationRules.required && !value)
                    return { pass: false, errorMessage: validationRules.errorMessages?.required || "This field is required" }
                break;

            case "type":
                const defaultErrorMessage = `The expexted type of this field should be ${validationRules.type}`
                if (validationRules.type == "email" && !emailRegex.test(value))
                    return { pass: false, errorMessage: validationRules.errorMessages?.type || defaultErrorMessage }

                else if (typeof value !== validationRules.type)
                    return { pass: false, errorMessage: validationRules.errorMessages?.type || defaultErrorMessage }
                break;

            default:
                break;
        }
    }

    return { pass: true }
}