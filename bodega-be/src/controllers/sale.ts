import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { apimethod } from "../decorators/apimethod";
import { Sale } from "../models/sale";


export default class SaleController {
    
    @apimethod
    async save(request: Request, response: Response){
        const repository = AppDataSource.getRepository(Sale);
        let entity: Sale = {...request.body};

        let res = await repository.save(
            repository.create(entity)
        );
    }

}

