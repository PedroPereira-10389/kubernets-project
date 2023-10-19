import { Store } from "src/typeorm";
import { MigrationInterface, QueryRunner } from "typeorm"
import { v4 as uuidv4 } from 'uuid';

export class Stores1696257629377 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const store = queryRunner.connection.getRepository(Store);
        await store.insert([
            {
                "uuid": uuidv4(),
                "name": "Continente",
                "address": "Av. da Bélgica 150",
                "latitude": 40.6563202,
                "longitude": -7.9266024,
            },
            {
                "uuid": uuidv4(),
                "name": "Mini Preço",
                "address": "Av. Cap. Silva Pereira 137",
                "latitude": 10.45455,
                "longitude": 12.45455,
            },
            {
                "uuid": uuidv4(),
                "name": "Auchan",
                "address": "Shopping Palácio do Gelo",
                "latitude": 10.45455,
                "longitude": 12.45455,
            },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM stores`);
    }

}
