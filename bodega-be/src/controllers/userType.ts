import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../data-source";
import { apimethod } from "../decorators/apimethod";
import { UserType } from "../models/userType";
import { ApiError } from "../util/apiError";

class UserTypeController {

    @apimethod
    async save(request: Request , response: Response ): Promise<void> {
        let repository = await AppDataSource.getRepository(UserType)
      
        let entity: UserType = {...request.body};
        
        if(entity.title == null || entity.title.trim() === "")
            throw new ApiError(StatusCodes.BAD_REQUEST, "O campo título é obrigatório");
        
        if(entity.description == null || entity.description.trim() === "")
            throw new ApiError(StatusCodes.BAD_REQUEST, "O campo descrição é obrigatório");           
        
        let res = await repository.save(entity);
        response.status(StatusCodes.CREATED).send(res);
    }

}

export default  UserTypeController;