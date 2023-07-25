import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import UserService from '../modules/users/user.service';


@ValidatorConstraint({ async: true })
export class IsEmailNotExists implements ValidatorConstraintInterface {

    private userService = new UserService();

    async validate(email: string) {
        const user = await this.userService.findByEmail(email)
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