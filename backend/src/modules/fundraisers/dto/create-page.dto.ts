import {  IsString, IsNotEmpty, MinLength, IsNumber, Min, IsEnum } from 'class-validator';

import { PageType } from '../fundraiser.entity';
import { MIN_LENGTHS, MIN_VALUES } from '../../../constants';

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
}