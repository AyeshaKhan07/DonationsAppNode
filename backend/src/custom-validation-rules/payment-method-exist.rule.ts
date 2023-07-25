import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import PaymentMethodService from '../modules/payment-methods/payments.service';

@ValidatorConstraint({ async: true })
export class IsPaymentMethodExists implements ValidatorConstraintInterface {

    private paymentMethodService = new PaymentMethodService();

    async validate(id: number) {
        const paymentMethod = await this.paymentMethodService.findById(id)
        return paymentMethod ? true : false;
    }

    defaultMessage() {
        return "Payment method does not exist";
    }
}

export function PaymentMethodExists(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPaymentMethodExists,
        });
    };
}