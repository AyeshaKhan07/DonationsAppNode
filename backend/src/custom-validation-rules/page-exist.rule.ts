import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import FundraiserRepository from '../modules/fundraisers/repository';

@ValidatorConstraint({ async: true })
export class IsPageExists implements ValidatorConstraintInterface {

    private fundraiserRepository = new FundraiserRepository();

    async validate(id: number) {
        const page = await this.fundraiserRepository.findById(id)
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