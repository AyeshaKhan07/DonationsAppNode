import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import UserRepository from '../modules/users/repository';

@ValidatorConstraint({ async: true })
export class IsUserExists implements ValidatorConstraintInterface {

    private userRepository = new UserRepository();

    async validate(ids: number | []) {
        if (typeof ids == 'number') {
            const user = await this.userRepository.findById(ids)
            return user ? true : false;
        }

        else if (Array.isArray(ids)) {
            for (const id of ids) {
                const user = await this.userRepository.findById(id)
                if (!user) return false
            }

            return true
        }
    }

    defaultMessage(args: ValidationArguments) {
        if (typeof args.value == 'number')
            return "No user exists against the provided id";

        else if(Array.isArray(args.value))
            return "One or more users do not exist against one of the provided ids"

        else return "No user found"
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