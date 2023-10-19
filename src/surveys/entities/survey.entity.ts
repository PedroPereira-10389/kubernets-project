import { Response, User } from "src/typeorm";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";
import { Business } from "./business.entity";
import { Product } from "src/products/entities/product.entity";

@Entity({ name: 'surveys' })
export class Survey {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    title: string;

    @Column({
        nullable: false,
        default: '',
    })
    description: string;

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

    @ManyToOne(() => User, (user) => user.surveys, { 
        onDelete: 'CASCADE' 
      })
    user: User

    @ManyToOne(() => Business, (business) => business.survey, { 
        onDelete: 'CASCADE' 
      })
    business: Business

    @OneToMany(() => Question, (question) => question.survey, {cascade:['insert', 'update']})
    question: Question[]

    @OneToMany(() => Response, (response) => response)
    response: Response[]

    @ManyToOne(() => Product, (product) => product.survey, { 
        onDelete: 'CASCADE' 
      })
    product: Product

}
