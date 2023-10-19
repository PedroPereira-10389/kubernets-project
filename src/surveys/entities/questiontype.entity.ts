import { Question} from "src/typeorm";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('question_types')
export class QuestionType {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    name: string;

    @Column({
        nullable: false,
        default: true,
    })
    is_active: boolean;

    @Column({
        type: 'timestamptz',
        nullable: true,
        default: () => 'NOW()',
    })
    created_at: Date;

    @Column({
        type: 'timestamptz',
        nullable: true,
        default: () => 'NOW()',
    })
    updated_at: Date;

    @OneToMany(() => Question, (question) => question.type)
    question: Question[]
}
