import { IsNotEmpty, IsNumber, Min, IsEnum, Max, IsOptional, IsBoolean } from 'class-validator';

import { User } from '../../users/user.entity';
import { DonationType } from '../donations.entity';
import { MAX_VALUES, MIN_VALUES } from '../../../constants';
import { PageExists } from '../../../custom-validation-rules/page-exist.rule';
import { CityExists } from '../../../custom-validation-rules/city-exist.rule';
import { PaymentMethodExists } from '../../../custom-validation-rules/payment-method-exist.rule';
import { IsTeamMember } from '../../../custom-validation-rules/member-assigned-to-fundraiser';

export class CreateDonationDto {

    @IsOptional()
    @IsNumber()
    readonly id?: number

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
    readonly page: number

    @IsNotEmpty()
    @IsNumber()
    @PaymentMethodExists()
    readonly paymentMethod: number

    @IsNotEmpty()
    @IsNumber()
    @CityExists()
    readonly city: number

    @IsOptional()
    @IsNumber()
    user?: number

    @IsOptional()
    @IsNumber()
    @IsTeamMember('page')
    readonly donatedTo?: number

    @IsOptional()
    @IsBoolean()
    readonly anonymousDonation: boolean

    @IsOptional()
    @IsBoolean()
    readonly transactionFeeCovered: boolean
}