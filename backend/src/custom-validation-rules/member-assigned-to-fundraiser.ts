import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import { connectionSource } from '../database/data-source';
import { Fundraiser } from '../modules/fundraisers/fundraiser.entity';

@ValidatorConstraint({ async: true })
export class IsMemeberAssigned implements ValidatorConstraintInterface {

    async validate(teamMember: number, args: ValidationArguments) {

        const page = args.object['page'];

        /**
         * We will check two conditions, either the team member is assigned to the page on which the user is making the donation
         * or the team member is actually the page owner. If any of these conditions are true, we are good to go, else we show the
         * error message.
         */

        const memberAssignedToThisPage = await connectionSource
            .createQueryBuilder()
            .select("fundraiser.id", "fundraiserId")
            .from(Fundraiser, "fundraiser")
            .innerJoin("fundraiser.teamMembers", "teamMembers", "teamMembers.id = :teamMember", { teamMember })
            .where("fundraiser.id = :page", { page })
            .getRawOne();

        if (memberAssignedToThisPage)
            return true

        else {
            const pageOwner = await connectionSource
                .createQueryBuilder()
                .select("fundraiser.id", "fundraiserId")
                .from(Fundraiser, "fundraiser")
                .innerJoin("fundraiser.pageOwner", "pageOwner", "pageOwner.id = :teamMember", { teamMember })
                .where("fundraiser.id = :page", { page })
                .getRawOne();

                return pageOwner ? true : false
        }
    }

    defaultMessage() {
        return "The member you are donating to, is neither the team member nor the owner of this page";
    }
}

export function IsTeamMember(property: string, validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsMemeberAssigned,
        });
    };
}