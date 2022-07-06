import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, RelationId, ManyToOne, OneToMany, AfterLoad } from "typeorm";
import { Category } from "./category";
import { Reserve } from "./reserve";
import { StockItem } from "./stockItem";

@Entity()
export class Product{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    price: number;

    @Column()
    description: string;
    
    quantity: number;

    @Column()
    image: string;

    // @Column()
    // status: number;
    
    @OneToOne(() => Category)
    category: Category

    @RelationId((product: Product) => product.category)
    categoryId: number;
    
    @OneToMany(() => StockItem, (stockItem) => stockItem.product)
    stockItems: StockItem[];

    stockItemIds: number[];
    
    @AfterLoad()
    setQuantity() {
        this.quantity = this.stockItems.length
    }

    @AfterLoad()
    setStockItemIds(){
        for(let item of this.stockItems){
            this.stockItemIds.push(item.id)
        }
    }
    

}