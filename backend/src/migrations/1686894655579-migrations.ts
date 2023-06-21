import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1686894655579 implements MigrationInterface {
    name = 'Migrations1686894655579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users_pages_fundraisers\` (\`usersId\` int NOT NULL, \`fundraisersId\` int NOT NULL, INDEX \`IDX_cbf782afacf4dea30cd9af5d2d\` (\`usersId\`), INDEX \`IDX_c09a92de430b7dc242b5bdea67\` (\`fundraisersId\`), PRIMARY KEY (\`usersId\`, \`fundraisersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_pages_fundraisers\` ADD CONSTRAINT \`FK_cbf782afacf4dea30cd9af5d2dd\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_pages_fundraisers\` ADD CONSTRAINT \`FK_c09a92de430b7dc242b5bdea67e\` FOREIGN KEY (\`fundraisersId\`) REFERENCES \`fundraisers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_pages_fundraisers\` DROP FOREIGN KEY \`FK_c09a92de430b7dc242b5bdea67e\``);
        await queryRunner.query(`ALTER TABLE \`users_pages_fundraisers\` DROP FOREIGN KEY \`FK_cbf782afacf4dea30cd9af5d2dd\``);
        await queryRunner.query(`DROP INDEX \`IDX_c09a92de430b7dc242b5bdea67\` ON \`users_pages_fundraisers\``);
        await queryRunner.query(`DROP INDEX \`IDX_cbf782afacf4dea30cd9af5d2d\` ON \`users_pages_fundraisers\``);
        await queryRunner.query(`DROP TABLE \`users_pages_fundraisers\``);
    }

}
