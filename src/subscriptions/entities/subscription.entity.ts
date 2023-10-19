import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SubscriptionType } from "./subscriptiontype.entity";
import { User } from "src/typeorm";

@Entity('subscriptions')
export class Subscription {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: number;

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

    
    @ManyToOne(() => User, (user) => user.subscription, { 
        onDelete: 'CASCADE' 
      })
    user: User

    @ManyToOne(() => SubscriptionType, (type) => type.subscription, { 
        onDelete: 'CASCADE' 
      })
    type: SubscriptionType

}
