import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1624113550516 implements MigrationInterface {
    name = 'initial1624113550516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_gender_enum" AS ENUM('Male', 'Female', 'Other')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "gender" "user_gender_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "user_gender_enum"`);
    }

}
