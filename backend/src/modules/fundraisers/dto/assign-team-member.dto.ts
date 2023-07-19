import {  IsNotEmpty, IsNumber, IsArray } from 'class-validator';

import { Fundraiser } from '../fundraiser.entity';
import { PageExists } from '../../../custom-validation-rules/page-exist.rule';
import { User } from '../../users/user.entity';

export class AssignTeamMembersDto {

    @IsNotEmpty()
    @IsNumber()
    @PageExists()
    readonly fundraiser: number

    @IsNotEmpty()
    @IsArray()
    readonly members: number[];
}