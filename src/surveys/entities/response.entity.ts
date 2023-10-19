import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Survey } from "./survey.entity";
import { Client } from "src/typeorm";
import { Answer } from "./answer.entity";

@Entity('responses')
export class Response {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    text_resp: string;

    @Column({
        nullable: false,
    })
    numeric_resp: number;

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

    @ManyToOne(() => Survey, (survey) => survey.response, { 
        onDelete: 'CASCADE' 
      })
    survey: Survey

    @ManyToOne(() => Client, (client) => client.response, { 
        onDelete: 'CASCADE' 
      })
    client: Client

    @OneToMany(() => Answer, (answer) => answer.response)
    answer: Answer[]

}
