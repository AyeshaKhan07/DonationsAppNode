import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import UserService from '../modules/users/user.service';

@ValidatorConstraint({ async: true })
export class IsEmailExists implements ValidatorConstraintInterface {

    async validate(email: string) {
        const user = await UserService.findByEmail(email)
        return user ? true : false;
    }

    defaultMessage() {
        return "No user registered with the provided email";
    }
}

export function EmailExists(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailExists,
        });
    };
}