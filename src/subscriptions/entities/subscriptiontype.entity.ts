import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subscription } from "./subscription.entity";

@Entity('subscription_type')
export class SubscriptionType {
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
        type: 'numeric',
        precision: 10,
        scale: 2,
        default: 0,
    })
    price: number;

    @OneToMany(() => Subscription, (subscription) => subscription.type)
    subscription: Subscription[]
}
