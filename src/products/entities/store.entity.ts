import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Survey } from 'src/surveys/entities/survey.entity';
import { v4 as uuidv4 } from 'uuid';
import { Product, Subscription } from 'src/typeorm';

@Entity({ name: 'stores' })
export class Store {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: number;

    @Column({
        nullable: true,
        unique: true
    })
    uuid: string;

    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        nullable: false,
        default: '',
        unique: true
    })
    address: string;

    @Column('decimal', {
        precision: 10,
        scale: 6
    })
    latitude: number;

    @Column('decimal', {
        precision: 10,
        scale: 6
    })
    longitude: number;

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

    @Column({
        type: 'timestamptz',
        nullable: true,
    })
    deleted_at: Date;

    @OneToMany(() => Product, (product) => product.store)
    product: Product[]
}