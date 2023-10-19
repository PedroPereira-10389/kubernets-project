import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Survey } from 'src/surveys/entities/survey.entity';
import { Role } from './roles.entity';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'src/typeorm';

@Entity({ name: 'users' })
export class User {
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
  })
  last_name: string;

  @Column({
    nullable: false,
    default: '',
    unique: true
  })
  username: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
    unique: true
  })
  email: string;

  @Column({
    name: 'enterprise',
    nullable: false,
    default: '',
    unique: true
  })
  enterprise: string;

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

  @OneToMany(() => Survey, (survey) => survey.user)
  surveys: Survey[]

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscription: Subscription[]

  @ManyToOne(() => Role, (role) => role.user, { 
    onDelete: 'CASCADE' 
  })
  role: Role

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  
  @BeforeInsert()
  async generateUuid(){
    this.uuid = uuidv4()
  }
}