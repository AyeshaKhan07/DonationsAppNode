import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional, IsNumber } from 'class-validator';

import { EmailNotExists } from '../../../custom-validation-rules/email-not-exist.rule';
import { MIN_LENGTHS } from '../../../constants';

export class CreateUserDto {
    
    @IsOptional()
    @IsNumber()
    readonly id?: number

    @IsNotEmpty()
    @IsString()
    @MinLength(MIN_LENGTHS.NAME)
    readonly firstName: string

    @IsNotEmpty()
    @IsString()
    @MinLength(MIN_LENGTHS.NAME)
    readonly lastName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(MIN_LENGTHS.CONTACT)
    readonly contact: string;
    
    @IsNotEmpty()
    @IsEmail()
    @EmailNotExists()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(MIN_LENGTHS.PASSWORD)
    readonly password: string;
}