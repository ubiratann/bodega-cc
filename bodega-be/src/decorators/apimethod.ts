import { Response } from "express";
import { handler } from "../util/defaultErrorHandler";

export function apimethod(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    descriptor.value = async (...args) => {
        try {
            await originalMethod.apply(this, args);
        }catch(error){
            let response: Response = args[1]
            handler(error, response);
        }
    }    
}