import { MigrationInterface, QueryRunner } from "typeorm";

export class DonationsTable1685932084433 implements MigrationInterface {
    name = 'DonationsTable1685932084433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`currencies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` char(10) NOT NULL, \`code\` char(10) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`countries\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` char(10) NOT NULL, \`currencyId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cities\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` char(10) NOT NULL, \`countryId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment-methods\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` char(50) NOT NULL, \`transactionFee\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`donations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` int(10) NOT NULL, \`anonymousDonation\` tinyint NOT NULL DEFAULT 0, \`transactionFeeCovered\` tinyint NOT NULL DEFAULT 0, \`donationType\` enum ('1', '2', '3') NOT NULL DEFAULT '1', \`userId\` int NOT NULL, \`pageId\` int NOT NULL, \`paymentMethodId\` int NOT NULL, \`cityId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`countries\` ADD CONSTRAINT \`FK_866fd31967a55fff3dd6094fd9e\` FOREIGN KEY (\`currencyId\`) REFERENCES \`currencies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cities\` ADD CONSTRAINT \`FK_b5f9bef6e3609b50aac3e103ab3\` FOREIGN KEY (\`countryId\`) REFERENCES \`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`donations\` ADD CONSTRAINT \`FK_cfd5edc39019b9001bd86e90f77\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`donations\` ADD CONSTRAINT \`FK_42fd1631c511cc30ae2eca0f081\` FOREIGN KEY (\`pageId\`) REFERENCES \`fundraisers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`donations\` ADD CONSTRAINT \`FK_2a93721ae5d01edb6f61e688d1e\` FOREIGN KEY (\`paymentMethodId\`) REFERENCES \`payment-methods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`donations\` ADD CONSTRAINT \`FK_4df97d19e6d98396a08cbe25be3\` FOREIGN KEY (\`cityId\`) REFERENCES \`cities\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`donations\` DROP FOREIGN KEY \`FK_4df97d19e6d98396a08cbe25be3\``);
        await queryRunner.query(`ALTER TABLE \`donations\` DROP FOREIGN KEY \`FK_2a93721ae5d01edb6f61e688d1e\``);
        await queryRunner.query(`ALTER TABLE \`donations\` DROP FOREIGN KEY \`FK_42fd1631c511cc30ae2eca0f081\``);
        await queryRunner.query(`ALTER TABLE \`donations\` DROP FOREIGN KEY \`FK_cfd5edc39019b9001bd86e90f77\``);
        await queryRunner.query(`ALTER TABLE \`cities\` DROP FOREIGN KEY \`FK_b5f9bef6e3609b50aac3e103ab3\``);
        await queryRunner.query(`ALTER TABLE \`countries\` DROP FOREIGN KEY \`FK_866fd31967a55fff3dd6094fd9e\``);
        await queryRunner.query(`DROP TABLE \`donations\``);
        await queryRunner.query(`DROP TABLE \`payment-methods\``);
        await queryRunner.query(`DROP TABLE \`cities\``);
        await queryRunner.query(`DROP TABLE \`countries\``);
        await queryRunner.query(`DROP TABLE \`currencies\``);
    }

}
