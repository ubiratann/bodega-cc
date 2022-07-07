import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FindManyOptions, Repository } from "typeorm";
import { ApiError } from "../util/apiError";


export class GenericController<T>{
    
    public repository: Repository<T>;
    PRODUCTS_PER_PAGE: number;

    constructor(){
        this.PRODUCTS_PER_PAGE = 10;
    }

    async validate(entity: T): Promise<void>{

    }

    async save(request: Request, response: Response): Promise<void>{
        try{
            let entity:T = { ...request.body } ;
            console.log(entity)
            await this.validate(entity);
            let res = this.repository. save(entity);
            response.status(StatusCodes.OK).send(res);
        
        }catch(error){ 
            if(error instanceof ApiError)
                response.status(error.code).send({
                    message: error.message
                });
            else
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }

    async delete(request: Request, response: Response): Promise<void>{
        try{
            let entity:T = { ...request.body } ;
            
            let res = this.repository.remove(entity);
            response.status(StatusCodes.OK).send(res);
        
        }catch(error){ 
            if(error instanceof ApiError)
                response.status(error.code).send({
                    message: error.message
                });
            else
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }

    async update(request: Request, response: Response): Promise<void>{
        try{
            let entity:T = { ...request.body } ;
            
            let res = this.repository.save(entity);
            response.status(StatusCodes.OK).send(res);
        
        }catch(error){ 
            if(error instanceof ApiError)
                response.status(error.code).send({
                    message: error.message
                });
            else
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }

    async get(request: Request, response: Response): Promise<void>{
        try{
            let entity:T = { ...request.body } ;
            response.status(StatusCodes.OK).send(request);

        }catch(error){ 
            if(error instanceof ApiError)
                response.status(error.code).send({
                    message: error.message
                });
            else
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }

    async findMany(request: Request, response: Response, findOptions: FindManyOptions){
        try{
            let res = await this.repository.find(findOptions);

            response.status(StatusCodes.OK).send(res);
        }catch(error){
            if(error instanceof ApiError)
            response.status(error.code).send({
                message: error.message
            });
        else
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }
}