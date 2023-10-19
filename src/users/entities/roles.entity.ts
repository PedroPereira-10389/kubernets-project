import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Survey } from 'src/surveys/entities/survey.entity';
import { User } from './user.entity';

@Entity({ name: 'roles' })
export class Role {
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

    @Column({
        type: 'timestamptz',
        nullable: true,
    })
    deleted_at: Date;

    @OneToMany(() => User, (user) => user.role, { cascade: ['insert', 'update'] })
    user: User[]

}