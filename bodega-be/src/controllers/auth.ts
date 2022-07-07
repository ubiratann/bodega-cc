import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { Equal } from "typeorm";
import { AppDataSource } from "../data-source";
import { apimethod } from "../decorators/apimethod";
import { User } from "../models/user";
import { ApiError } from "../util/apiError";

export default class AuthController {
    
    @apimethod
    async authenticate(request: Request, response: Response){
        
        const repository = AppDataSource.getRepository(User);
        const  { email, password } = request.body ;

        const entity = await repository.findOne({
            where: {
                email: Equal(email)
            }
        });

        if(entity == null)
            throw new ApiError(StatusCodes.UNAUTHORIZED, "Usuário não encontrado!");
        
        let comp = await bcrypt.compare(password, entity.password);
        
        if (!comp)
            throw new ApiError(StatusCodes.UNAUTHORIZED, "Senha incorreta!");

        const token = jwt.sign({id: entity.id}, "secret", {expiresIn: "1d"});
        
        delete entity.password; // hiding password

        response.status(StatusCodes.ACCEPTED).send({
            user: entity,
            token: token
        });
    }
}