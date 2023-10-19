import { Business } from "src/typeorm";
import { MigrationInterface, QueryRunner } from "typeorm"

export class Businesses1695466851469 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const businesses = queryRunner.connection.getRepository(Business);
        await businesses.insert([
            {
                "name": "Restaurants"
            },
            {
                "name": "Stores"
            },
            {
                "name": "Industry"
            },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM businesses`);
    }

}
