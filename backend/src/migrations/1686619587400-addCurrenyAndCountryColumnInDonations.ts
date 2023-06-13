import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCurrenyAndCountryColumnInDonations1686619587400 implements MigrationInterface {
    name = 'AddCurrenyAndCountryColumnInDonations1686619587400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`donations\` ADD \`countryId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`donations\` ADD \`currencyId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`donations\` ADD CONSTRAINT \`FK_39eb8f53ec6e57da942bbd50428\` FOREIGN KEY (\`countryId\`) REFERENCES \`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`donations\` ADD CONSTRAINT \`FK_690cf3e965ae256e97f1d0ff8e3\` FOREIGN KEY (\`currencyId\`) REFERENCES \`currencies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`donations\` DROP FOREIGN KEY \`FK_690cf3e965ae256e97f1d0ff8e3\``);
        await queryRunner.query(`ALTER TABLE \`donations\` DROP FOREIGN KEY \`FK_39eb8f53ec6e57da942bbd50428\``);
        await queryRunner.query(`ALTER TABLE \`donations\` DROP COLUMN \`currencyId\``);
        await queryRunner.query(`ALTER TABLE \`donations\` DROP COLUMN \`countryId\``);
    }

}
