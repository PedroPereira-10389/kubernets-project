import { Survey } from "src/typeorm";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Option } from "./option.entity";
import { QuestionType } from "./questiontype.entity";

@Entity('questions')
export class Question {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    label: string;

    @Column({
        nullable: false,
        default: false,
    })
    is_required: boolean;

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

    @ManyToOne(() => Survey, (survey) => survey.question, { 
        onDelete: 'CASCADE' 
      })
    survey: Survey

    @OneToMany(() => Option, (option) => option.question)
    option: Option[]

    @ManyToOne(() => QuestionType, (type) => type.question, { 
        onDelete: 'CASCADE' 
      })
    type: QuestionType
}
