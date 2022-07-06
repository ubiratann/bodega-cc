import { StatusCodes } from "http-status-codes";
import { Request, Response, } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/user";
import { handler } from "../util/defaultErrorHandler";
import { ApiError } from "../util/apiError";
import { GenericController } from "./generic";
import bcrypt  from "bcryptjs";
import { apimethod } from "../decorators/apimethod";


class UserController{


    @apimethod
    async login(request: Request, response: Response): Promise<void>{
        
        let entity: User = {...request.body};
        let repository = AppDataSource.getRepository(User);
        
            
        let res: User = await repository.findOneBy({ email: entity.email });
        
        if(res == null)
            throw new ApiError(StatusCodes.NOT_FOUND, "Usuário não encontrado!")
        
        let comp = await bcrypt.compare(entity.password, res.password);
        if (!comp)
            throw new ApiError(StatusCodes.UNAUTHORIZED, "Senha incorreta!")

        response.status(StatusCodes.OK).send(res);
    }

    @apimethod
    async save(request: Request, response: Response): Promise<void>{
        
        let entity: User = {...request.body};
        let repository = AppDataSource.getRepository(User);

        const existentEmail = await repository.findOneBy({ email: entity.email });
        if (existentEmail)
            throw new ApiError(StatusCodes.CONFLICT, "O email informado já está em uso!");

        let res = await repository.save(
            repository.create({...entity}));
        response.status(StatusCodes.CREATED).send(res);
    }
}

export default  UserController;