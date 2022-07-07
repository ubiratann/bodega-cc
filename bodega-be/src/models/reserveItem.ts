import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, RelationId, ManyToOne } from "typeorm";
import { Reserve } from "./reserve";
import { StockItem } from "./stockItem";

@Entity()
export class ReserveItem{
    
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Reserve, (reserve) => reserve.reserveItems)
    reserve: Reserve

    @RelationId((reserveItem: ReserveItem) => reserveItem.reserve)
    reserveId: number;

    @ManyToOne(() => StockItem)
    stockItem: StockItem

    @RelationId((reserveItem: ReserveItem) => reserveItem.stockItem)
    stockItemId: number;
}