import { IsNotEmpty, IsNumber, Min, IsEnum, Max, IsOptional } from 'class-validator';

import { User } from '../../users/user.entity';
import { City } from '../../cities/city.entity';
import { DonationType } from '../donations.entity';
import { MAX_VALUES, MIN_VALUES } from '../../../constants';
import { Fundraiser } from '../../fundraisers/fundraiser.entity';
import { PaymentMethod } from '../../payment-methods/payment-method.entity';
import { PageExists } from '../../../custom-validation-rules/page-exist.rule';
import { CityExists } from '../../../custom-validation-rules/city-exist.rule';
import { PaymentMethodExists } from '../../../custom-validation-rules/payment-method-exist.rule';

export class CreateDonationDto {

    @IsNotEmpty()
    @IsNumber()
    @Min(MIN_VALUES.DONATION_AMOUNT)
    @Max(MAX_VALUES.DONATION_AMOUNT)
    readonly amount: number;

    @IsNotEmpty()
    @IsNumber()
    @IsEnum(DonationType)
    readonly donationType: number;

    @IsNotEmpty()
    @IsNumber()
    @PageExists()
    readonly page: Fundraiser

    @IsNotEmpty()
    @IsNumber()
    @PaymentMethodExists()
    readonly paymentMethod: PaymentMethod

    @IsNotEmpty()
    @IsNumber()
    @CityExists()
    readonly city: City

    @IsOptional()
    @IsNumber()
    user: User
}