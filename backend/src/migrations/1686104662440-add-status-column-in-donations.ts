import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusColumnInDonations1686104662440 implements MigrationInterface {
    name = 'AddStatusColumnInDonations1686104662440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`donations\` ADD \`status\` enum ('1', '2', '3') NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`donations\` DROP COLUMN \`status\``);
    }

}
