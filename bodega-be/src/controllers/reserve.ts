import { StatusCodes } from "http-status-codes";
import { Request, Response} from "express";
import { GenericController } from "./generic";
import { Reserve } from "../models/reserve";
import { handler } from "../util/defaultErrorHandler";
import ProductController  from "./product";
import { Equal, MoreThan } from "typeorm";
import { Product } from "../models/product";
import { ApiError } from "../util/apiError";
import { apimethod } from "../decorators/apimethod";


export class ReserveController {
    
    @apimethod
    async save(request: Request, response: Response){
        
    }
}
