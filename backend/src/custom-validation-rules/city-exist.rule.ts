import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import CityService from '../modules/cities/city.service';

@ValidatorConstraint({ async: true })
export class IsCityExists implements ValidatorConstraintInterface {

    private cityService = new CityService();

    async validate(id: number) {
        const city = await this.cityService.findById(id)
        return city ? true : false;
    }

    defaultMessage() {
        return "Provided city does not exist";
    }
}

export function CityExists(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCityExists,
        });
    };
}