import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Response } from "src/typeorm";

@Entity('clients')
export class Client {
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
        default: '',
        unique: true
    })
    email: string;

    @Column({
        nullable: false,
        default: '',
    })
    password: string;

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

    @OneToMany(() => Response, (response) => response.client)
    response: Response[]

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }


}
