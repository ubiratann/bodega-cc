import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../data-source";
import { apimethod } from "../decorators/apimethod";
import { Category } from "../models/category";
import { ApiError } from "../util/apiError";

export class CategoryController{
    @apimethod
    async save(request: Request , response: Response ): Promise<void> {
        let repository = await AppDataSource.getRepository(Category)
        console.log("entrou")
        let entity: Category = {...request.body};
        
        if(entity.title == null || entity.title.trim() === "")
            throw new ApiError(StatusCodes.BAD_REQUEST, "O campo título é obrigatório");
        
        if(entity.description == null || entity.description.trim() === "")
            throw new ApiError(StatusCodes.BAD_REQUEST, "O campo descrição é obrigatório");           
        
        let res = await repository.save(entity);
        response.status(StatusCodes.CREATED).send(res);
    }
}