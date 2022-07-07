import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { ReserveItem } from "./reserveItem";
import { User } from "./user";

@Entity()
export class Reserve{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @RelationId((reserve: Reserve) => reserve.user)
    userId: number;

    // @Column()
    // quantity: number;

    @OneToMany(() => ReserveItem, (reserveItem) => reserveItem.reserve)
    reserveItems: ReserveItem[];
}