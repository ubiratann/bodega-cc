import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "./apiError";

export function handler(error, response: Response){
    if(error instanceof ApiError)
        response.status(error.code).send({
            message: error.message
        });
    else
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
}