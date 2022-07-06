import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Product } from "./product";
import { Reserve } from "./reserve";
import { StockItem } from "./stockItem";
import { User } from "./user";

@Entity()
export class Sale{

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    user: User;

    @RelationId((sale: Sale) => sale.user)
    userId: number;

    @OneToOne(() => Reserve)
    reserve: Reserve

    @RelationId((sale: Sale) => sale.reserve)
    reserveId: number;
}