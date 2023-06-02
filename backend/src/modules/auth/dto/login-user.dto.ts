import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

import { MIN_LENGTHS } from '../../../constants';

export class LoginUserDto {
        
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(MIN_LENGTHS.PASSWORD)
    readonly password: string;
}