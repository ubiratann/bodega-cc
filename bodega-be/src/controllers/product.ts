import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { Product } from "../models/product";
import { AppDataSource } from "../data-source";
import { GenericController } from "./generic";
import { Equal, FindManyOptions, LessThan, Like, MoreThan } from "typeorm";
import { handler } from "../util/defaultErrorHandler";
import { ApiError } from "../util/apiError";
import { StockItem } from "../models/stockItem";


const AVAILABLE = 1
const RESERVED = 2
class ProductController extends GenericController<Product>{

    constructor(){
        super();
        this.repository = AppDataSource.getRepository(Product);
    }

    async  getAll(request: Request, response:Response){
        let { page } = request.params;
        const findOptions: FindManyOptions = {
            skip: this.PRODUCTS_PER_PAGE * +page,
            take: this.PRODUCTS_PER_PAGE,
            relations: ["stockItems"],
            where: {
                stockItems : {
                    status: Equal(1)
                },
            },

        }

        this.repository.createQueryBuilder("product")
            .where("p")
            .skip
    }
    
    async  getByCategory(request: Request, response:Response){
        let { categoryId, page } = request.params
        const findOptions: FindManyOptions = {
            skip: this.PRODUCTS_PER_PAGE * +page,
            take: this.PRODUCTS_PER_PAGE,
            relations: ["stockItems"],
            where: {
                stockItems : {
                    status: Equal(1)
                },
                categoryId: Equal(+categoryId),
            }
        }
        
        await this.findMany(request, response, findOptions);
    }
    
    async  getByHigherValue(request: Request, response:Response){
        let { value, page } = request.params
        const findOptions: FindManyOptions = {
            skip: this.PRODUCTS_PER_PAGE * +page,
            take: this.PRODUCTS_PER_PAGE,
            relations: ["stockItems"],
            where: {
                stockItems : {
                    status: Equal(1)
                },
                price: LessThan(+value),
            }
        }
        
        await this.findMany(request, response, findOptions);
    }
    
    async  getByLowerValue(request: Request, response:Response){
        let { value, page } = request.params
        const findOptions: FindManyOptions = {
            skip: this.PRODUCTS_PER_PAGE * +page,
            take: this.PRODUCTS_PER_PAGE,
            relations: ["stockItems"],
            where: {
                stockItems : {
                    status: Equal(1)
                },
                quantity: MoreThan(0)
            }
        }

        await this.findMany(request, response, findOptions);
    }
    
    async  getByName (request: Request, response:Response){
        let { name, page } = request.params
        const findOptions: FindManyOptions = {
            skip: this.PRODUCTS_PER_PAGE * +page,
            take: this.PRODUCTS_PER_PAGE,
            relations: ["stockItems"],
            where: {
                stockItems : {
                    status: Equal(1)
                },
                name: Like(`%${name}%`),
            }
        }

        await this.findMany(request, response, findOptions);
    }
        
    async  updatePrice(request: Request, response:Response){        
        try{
            let { id, newPrice } = request.body;
            let product: Product = await this.repository.findOneBy({id:id});
            product.price = newPrice;
            await this.repository.save(product);
        }catch(error){
            handler(error, response);
        }
    }

    async save(request: Request, response: Response): Promise<void>{
        try{
            let entity: Product = { ...request.body } ;
            // console.log(entity)
            
            if(entity.categoryId == null)
                throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Não é possível inserir produto com categoria vazia!")

            if(entity.description == null || entity.description.trim() == "")
                throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Não é possível inserir produto com descrição vazia!")

            if(entity.description == null || entity.image.trim() == "")
                throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Não é possível inserir produto com imagem vazia!")

            if(entity.description == null || entity.name.trim() == "")
                throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Não é possível inserir produto com nome vazio!")

            let res = await this.repository.save(entity);

            const stockItemRepository = AppDataSource.getRepository(StockItem);
            for(let i = 0; i <= entity.quantity; i++ ){
                let stockItem = new StockItem()
                
                stockItem.status = AVAILABLE;
                stockItem.productId = res.id;

                res.stockItemIds.push((await stockItemRepository.save(stockItem)).id);
            }

            response.status(StatusCodes.OK).send(res);
        }catch(error){
            handler(error, response)
        }
    }
    

}    

export default new ProductController();

