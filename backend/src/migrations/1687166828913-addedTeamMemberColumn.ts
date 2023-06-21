import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTeamMemberColumn1687166828913 implements MigrationInterface {
    name = 'AddedTeamMemberColumn1687166828913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`donations\` ADD \`donatedToId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` ADD \`pageOwnerId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`donations\` ADD CONSTRAINT \`FK_7e5530d3fe3641065cbacc158f6\` FOREIGN KEY (\`donatedToId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` ADD CONSTRAINT \`FK_103365452dfeee500c4435348bf\` FOREIGN KEY (\`pageOwnerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fundraisers\` DROP FOREIGN KEY \`FK_103365452dfeee500c4435348bf\``);
        await queryRunner.query(`ALTER TABLE \`donations\` DROP FOREIGN KEY \`FK_7e5530d3fe3641065cbacc158f6\``);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` DROP COLUMN \`pageOwnerId\``);
        await queryRunner.query(`ALTER TABLE \`donations\` DROP COLUMN \`donatedToId\``);
    }

}
