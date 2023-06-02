import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import UserRepository from '../modules/users/repository';

@ValidatorConstraint({ async: true })
export class IsUserExists implements ValidatorConstraintInterface {

    async validate(id: number) {
        const user = await UserRepository.findById(id)
        return user ? true : false;
    }

    defaultMessage() {
        return "No user exists against the provided id";
    }
}

export function UserExists(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserExists,
        });
    };
}