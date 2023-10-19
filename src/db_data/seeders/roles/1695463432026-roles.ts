import { Role } from "src/typeorm";
import { MigrationInterface, QueryRunner } from "typeorm"

export class Roles1695463432026 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const roles = queryRunner.connection.getRepository(Role);
        await roles.insert([
            {
                "name": "SuperAdmin"
            },
            {
                "name": "Admin"
            },
            {
                "name": "Employee"
            },
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM roles`);
    }

}
