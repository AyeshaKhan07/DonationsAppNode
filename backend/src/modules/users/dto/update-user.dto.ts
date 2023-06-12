import { IsString, MinLength, IsOptional } from 'class-validator';

import { MIN_LENGTHS } from '../../../constants';

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    @MinLength(MIN_LENGTHS.NAME)
    readonly firstName: string

    @IsOptional()
    @IsString()
    @MinLength(MIN_LENGTHS.NAME)
    readonly lastName: string;

    @IsOptional()
    @IsString()
    @MinLength(MIN_LENGTHS.CONTACT)
    readonly contact: string;

}