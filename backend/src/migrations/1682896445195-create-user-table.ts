import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1682896445195 implements MigrationInterface {
    name = 'CreateUserTable1682896445195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` char(50) NOT NULL, \`lastName\` char(50) NOT NULL, \`email\` char(50) NOT NULL, \`contact\` char(50) NOT NULL, \`password\` char(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
