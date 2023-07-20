import {  IsNotEmpty, IsNumber, IsArray } from 'class-validator';

import { PageExists } from '../../../custom-validation-rules/page-exist.rule';

export class AssignTeamMembersDto {

    @IsNotEmpty()
    @IsNumber()
    @PageExists({message: "The page on which your are trying to assign members does not exist"})
    readonly fundraiser: number

    @IsNotEmpty()
    @IsArray()
    readonly members: number[];
}