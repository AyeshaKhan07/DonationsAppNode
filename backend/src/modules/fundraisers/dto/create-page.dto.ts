import {  IsString, IsNotEmpty, MinLength, IsNumber, Min, IsEnum, IsOptional, IsArray } from 'class-validator';

import { PageType } from '../fundraiser.entity';
import { MIN_LENGTHS, MIN_VALUES } from '../../../constants';
import { CityExists } from '../../../custom-validation-rules/city-exist.rule';
import { UserExists } from '../../../custom-validation-rules/user-exist.rule';

export class CreatePageDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(MIN_LENGTHS.NAME)
    readonly name: string

    @IsNotEmpty()
    @IsNumber()
    @Min(MIN_VALUES.GOAL_AMOUNT)
    readonly goal: number;

    @IsNotEmpty()
    @IsNumber()
    @IsEnum(PageType)
    readonly pageType: number;

    @IsNotEmpty()
    @IsString()
    readonly story: string

    @IsNotEmpty()
    @IsNumber()
    @CityExists()
    readonly city: number

    // @IsOptional()
    // @IsBoolean()
    // readonly teamPage: boolean

    @IsOptional()
    @IsArray()
    @UserExists()
    readonly teamMembers: number[]
}