import { MigrationInterface, QueryRunner } from "typeorm";

export class TeamMembersAndTeamPageColumnAdded1686893703324 implements MigrationInterface {
    name = 'TeamMembersAndTeamPageColumnAdded1686893703324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fundraisers\` DROP FOREIGN KEY \`FK_d89d1b3217ee7703aee4fa6bbb6\``);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` CHANGE \`userId\` \`teamPage\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` DROP COLUMN \`teamPage\``);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` ADD \`teamPage\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fundraisers\` DROP COLUMN \`teamPage\``);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` ADD \`teamPage\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` CHANGE \`teamPage\` \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` ADD CONSTRAINT \`FK_d89d1b3217ee7703aee4fa6bbb6\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
