import { SubscriptionType } from "src/typeorm";
import { MigrationInterface, QueryRunner } from "typeorm"

export class Subscriptionstype1695465319092 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const subscription_type = queryRunner.connection.getRepository(SubscriptionType);
        await subscription_type.insert([
            {
                "name": "Premium",
                "price": 19.99

            },
            {
                "name": "Standard",
                "price": 10.99
            },
            {
                "name": "Basic",
                "price": 6.99
            },
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM subscription_type`);
    }

}
