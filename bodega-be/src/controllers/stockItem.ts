import { PrimaryGeneratedColumn } from "typeorm";
import { AppDataSource } from "../data-source";
import { StockItem } from "../models/stockItem";
import { GenericController } from "./generic";


class SockItemController extends GenericController<StockItem> {
    
    constructor(){
        super();
        this.repository = AppDataSource.getRepository(StockItem);
    }
}