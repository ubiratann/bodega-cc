import { StatusCodes } from "http-status-codes";
import { Request, Response} from "express";
import { GenericController } from "./generic";
import { Reserve } from "../models/reserve";
import { handler } from "../util/defaultErrorHandler";
import { ProductController } from "./product";
import { Equal, MoreThan } from "typeorm";
import { Product } from "../models/product";
import { ApiError } from "../util/apiError";


class ReserveController extends GenericController<Reserve> {
    constructor(){
        super();
    }

    async validate(entity: Reserve): Promise<void> {
        let productId = entity.id;
        let productController = new ProductController();
        let result: Product = await productController.repository.findOne({
            where: {
                id: Equal(productId),
                quantity: MoreThan(entity.quantity)
            }
        }); 

        if (result == null)
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Não existem produtos o suficiente para efetuar reserva!")
    }

    async save(request: Request, response: Response){
        try{
            let reserve: Reserve = { ...request.body }
            this.validate(reserve);

        }catch(error){
            handler(error, response);
        }
    }
}

export default new ReserveController();