import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import UserRepository from '../modules/users/repository';


@ValidatorConstraint({ async: true })
export class IsEmailNotExists implements ValidatorConstraintInterface {

    private userRepository = new UserRepository();

    async validate(email: string) {
        const user = await this.userRepository.findByEmail(email)
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