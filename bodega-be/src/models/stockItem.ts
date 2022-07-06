import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, RelationId, ManyToOne } from "typeorm";
import { Product } from "./product";

@Entity()
export class StockItem{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    status: number;

    @ManyToOne(() => Product)
    product: Product;

    @RelationId((stockItem: StockItem) => stockItem.product)
    productId;

}