import { MigrationInterface, QueryRunner } from "typeorm"
import { User } from "src/typeorm";
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
export class Users1695555590663 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const users = queryRunner.connection.getRepository(User);
        const salt = await bcrypt.genSalt();
        const password = '123456';
        const hash = await bcrypt.hash(password, salt);

        await users.insert([{
            "name": "Pedro",
            "last_name": "Noutel",
            "username": "noutel",
            "uuid": uuidv4(),
            "email": "noutel@hotmail.com",
            "password": hash.toString(),
            "enterprise": "Seemly",
            "is_active": true,
        },
        {
            "name": "Admin",
            "last_name": "admin",
            "username": "admin",
            "uuid": uuidv4(),
            "email": "admin@hotmail.com",
            "password": hash.toString(),
            "enterprise": "Admin",
            "is_active": true,
        },
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users`);
    }

}
