export interface IValidationSchema {
    [key: string] : IValidationRules
}

export interface IValidationRules {
    required?: boolean
    type?: "string"|"email"|"number"
    errorMessages?: {
        required?: string
        type?: string
    }
}

export interface IValidationReturns {
    pass: boolean
    errorMessage?: string
}