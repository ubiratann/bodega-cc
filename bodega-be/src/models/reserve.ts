import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { ReserveItem } from "./reserveItem";
import { User } from "./user";

@Entity()
export class Reserve{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 1})
    status: number;

    @ManyToOne(() => User)
    user: User;

    @RelationId((reserve: Reserve) => reserve.user)
    userId: number;

    @OneToMany(() => ReserveItem, (reserveItem) => reserveItem.reserve)
    reserveItems: ReserveItem[];

    @CreateDateColumn()
    createdAt: Date;
}