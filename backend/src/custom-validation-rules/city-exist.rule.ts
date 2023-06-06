import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import CityRepository from '../modules/cities/city.repository';

@ValidatorConstraint({ async: true })
export class IsCityExists implements ValidatorConstraintInterface {

    private cityRepository = new CityRepository();

    async validate(id: number) {
        const city = await this.cityRepository.findById(id)
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