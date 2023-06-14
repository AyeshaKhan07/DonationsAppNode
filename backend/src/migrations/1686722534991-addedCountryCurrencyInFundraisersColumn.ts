import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCountryCurrencyInFundraisersColumn1686722534991 implements MigrationInterface {
    name = 'AddedCountryCurrencyInFundraisersColumn1686722534991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fundraisers\` ADD \`cityId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` ADD \`countryId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` ADD \`currencyId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` ADD CONSTRAINT \`FK_0e8c1cdbf9edc105242dc014b3a\` FOREIGN KEY (\`cityId\`) REFERENCES \`cities\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` ADD CONSTRAINT \`FK_89e46064b3a92587981981117bb\` FOREIGN KEY (\`countryId\`) REFERENCES \`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` ADD CONSTRAINT \`FK_f447072e82a4c3a4cd6e393b639\` FOREIGN KEY (\`currencyId\`) REFERENCES \`currencies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fundraisers\` DROP FOREIGN KEY \`FK_f447072e82a4c3a4cd6e393b639\``);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` DROP FOREIGN KEY \`FK_89e46064b3a92587981981117bb\``);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` DROP FOREIGN KEY \`FK_0e8c1cdbf9edc105242dc014b3a\``);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` DROP COLUMN \`currencyId\``);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` DROP COLUMN \`countryId\``);
        await queryRunner.query(`ALTER TABLE \`fundraisers\` DROP COLUMN \`cityId\``);
    }

}
