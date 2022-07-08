import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../util/apiError";
import { handler } from "../util/defaultErrorHandler";
import jwt from "jsonwebtoken";

interface TokenPayload{
    id: number,
    iat: number,
    exp: number;
}


export default function authMiddleware(request: Request, response: Response, next: NextFunction){
   
    try{
        const { authorization } = request.headers;
    
        if(!authorization)
            throw new ApiError(StatusCodes.UNAUTHORIZED, "Falha no token de autenticaçao do usuário");
        
        const token = authorization.replace("Bearer", "").trim();
        const data = jwt.verify(token, "secret");
        const { id } = data as TokenPayload;

        request.userId = id;
        return next();
        
    }catch(error){
        handler(error, response);
    }
    
}