import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import FundraiserService from '../modules/fundraisers/fundraiser.service';

@ValidatorConstraint({ async: true })
export class IsPageExists implements ValidatorConstraintInterface {

    private fundraiserService = new FundraiserService();

    async validate(id: number) {
        const page = await this.fundraiserService.findById(id)
        return page ? true : false;
    }

    defaultMessage() {
        return "The page on which you are trying to make donation doses not exist";
    }
}

export function PageExists(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPageExists,
        });
    };
}