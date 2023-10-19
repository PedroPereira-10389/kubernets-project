import { Store, Survey } from "src/typeorm";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
        unique: true
    })
    reference: string;

    @Column({
        nullable: false,
        default: '',
        unique: true
    })
    name: string;

    @Column({
        nullable: false,
        default: 0,
    })
    price: number;

    @Column({
        nullable: false,
        default: 0,
    })
    quantity: number;

    @Column({
        type: "bytea",
        nullable: true,
    })
    photo: Buffer;

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

    @OneToMany(() => Survey, (survey) => survey.product)
    survey: Survey[]

    @ManyToOne(() => Store, (store) => store.product, { 
        onDelete: 'CASCADE' 
      })
    store: Store

}
