import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1684981178287 implements MigrationInterface {
    name = 'Migrations1684981178287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`fundraisers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` char(50) NOT NULL, \`goal\` int(10) NOT NULL, \`pageType\` enum ('1', '2', '3', '4') NOT NULL DEFAULT '2', \`story\` text NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` ADD CONSTRAINT \`FK_d89d1b3217ee7703aee4fa6bbb6\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fundraisers\` DROP FOREIGN KEY \`FK_d89d1b3217ee7703aee4fa6bbb6\``);
        await queryRunner.query(`DROP TABLE \`fundraisers\``);
    }

}
