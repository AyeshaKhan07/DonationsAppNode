import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import UserService from '../modules/users/user.service';

@ValidatorConstraint({ async: true })
export class IsUserExists implements ValidatorConstraintInterface {

    private userService = new UserService();

    async validate(ids: number | []) {
        if (typeof ids == 'number') {
            const user = await this.userService.findById(ids)
            return user ? true : false;
        }

        else if (Array.isArray(ids)) {
            for (const id of ids) {
                const user = await this.userService.findById(id)
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