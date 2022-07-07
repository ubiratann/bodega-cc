import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { GenericController } from "./generic";
import { Sale } from "../models/sale";
import { AppDataSource } from "../data-source";
import { handler } from "../util/defaultErrorHandler";


class SaleController extends GenericController<Sale>{
    
    constructor(){
        super()
        this.repository = AppDataSource.getRepository(Sale);
    }


    async validateSale(entity: Sale){

    }

    // async save(request: Request, response: Response){
    //     try{

    //         let entity: Sale = {...request.body};
    //         await this.validateSale(entity);

    //         await this.save();
    //     }catch(error){
    //         handler(error, response);
    //     }

    // }
}

