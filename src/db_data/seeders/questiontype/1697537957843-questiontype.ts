import { QuestionType } from "src/typeorm";
import { MigrationInterface, QueryRunner } from "typeorm"

export class Questiontype1697537957843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const questionType = queryRunner.connection.getRepository(QuestionType);
        await questionType.insert([
            {
                "name": 'Free'
            },
            {
                "name": 'Multiple Choice'
            },
            {
                "name": 'Choice'
            }
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM question_types`);
    }

}
