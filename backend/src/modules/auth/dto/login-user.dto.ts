import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

import { MIN_LENGTHS } from '../../../constants';
import { EmailExists } from '../../../custom-validation-rules/email-exist.rule';

export class LoginUserDto {
        
    @IsNotEmpty()
    @IsEmail()
    @EmailExists()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(MIN_LENGTHS.PASSWORD)
    readonly password: string;
}