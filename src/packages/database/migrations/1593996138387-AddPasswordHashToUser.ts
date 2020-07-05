import {MigrationInterface, QueryRunner} from "typeorm";
import config from "~/config";

export class AddPasswordHashToUser1593996138387 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE ${config.DB.MAIN_SCHEMA}.users ADD COLUMN password_hash varchar(255) NOT NULL`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE ${config.DB.MAIN_SCHEMA}.users DROP COLUMN password_hash`)
    }

}
