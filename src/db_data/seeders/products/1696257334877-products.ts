import { Product } from "src/typeorm";
import { MigrationInterface, QueryRunner } from "typeorm"
import { v4 as uuidv4 } from 'uuid';

export class Products1696257334877 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const product = queryRunner.connection.getRepository(Product);
        await product.insert([
            {
                "reference": uuidv4(),
                "name": "Apple",
                "price": 10.99,
                "quantity": 12,                  
            },
            {
                "reference": uuidv4(),
                "name": "Peaches",
                "price": 15.99,
                "quantity": 11       
            },
            {
                "reference": uuidv4(),
                "name": "Chocolate",
                "price": 9.99,
                "quantity": 10    
            },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM products`);
    }

}
