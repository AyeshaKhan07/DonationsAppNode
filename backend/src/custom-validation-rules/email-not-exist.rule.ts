import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import UserRepository from '../modules/users/repository';

@ValidatorConstraint({ async: true })
export class IsEmailNotExists implements ValidatorConstraintInterface {

    async validate(email: string) {
        const user = await UserRepository.findByEmail(email)
        return !user;
    }

    defaultMessage() {
        return "Email already exist";
    }
}

export function EmailNotExists(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailNotExists,
        });
    };
}