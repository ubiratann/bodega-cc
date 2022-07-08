import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Equal, FindManyOptions, LessThan, Like, MoreThan } from "typeorm";
import { AppDataSource } from "../data-source";
import { apimethod } from "../decorators/apimethod";
import { Category } from "../models/category";
import { Product } from "../models/product";
import { StockItem } from "../models/stockItem";
import { ApiError } from "../util/apiError";


const AVAILABLE = 1
const RESERVED = 2
const PRODUCTS_PER_PAGE = 10

class ProductController {


    @apimethod
    async getAll(request: Request, response:Response){
        let { page } = request.params;
        const repository = AppDataSource.getRepository(Product);

        const findOptions: FindManyOptions = {
            skip: PRODUCTS_PER_PAGE * +page,
            take: PRODUCTS_PER_PAGE,
            relations: {
                stockItems: true, 
                category: true,
            },
            where: {
                stockItems : {
                    status: Equal(AVAILABLE)
                },
            },
        }
        let res: Product[] = await repository.find(findOptions);
        response.status(StatusCodes.OK).send(res);
        
    }
    
    @apimethod
    async  getByCategory(request: Request, response:Response){
        let { id , page } = request.params;
        const repository = AppDataSource.getRepository(Product);
        const findOptions: FindManyOptions = {
            skip: PRODUCTS_PER_PAGE * +page,
            take: PRODUCTS_PER_PAGE,
            relations: {
                stockItems: true, 
                category: true,
            },
            where: {
                stockItems : {
                    status: Equal(1)
                },
                category:{
                    id: Equal(+id)
                }
            }
        }
        
        let res: Product[] = await repository.find(findOptions);
        response.status(StatusCodes.OK).send(res);
    }
    
    @apimethod
    async  getByHigherValue(request: Request, response:Response){
        let { value, page } = request.params;
        const repository = AppDataSource.getRepository(Product);

        const findOptions: FindManyOptions = {
            skip: PRODUCTS_PER_PAGE * +page,
            take: PRODUCTS_PER_PAGE,
            relations: {
                stockItems: true, 
                category: true,
            },
            where: {
                stockItems : {
                    status: Equal(1)
                },
                price: MoreThan(+value),
            }
        }
        
        let res: Product[] = await repository.find(findOptions);
        response.status(StatusCodes.OK).send(res);
    }
    
    @apimethod
    async  getByLowerValue(request: Request, response:Response){
        let { value, page } = request.params;
        const repository = AppDataSource.getRepository(Product);

        const findOptions: FindManyOptions = {
            skip: PRODUCTS_PER_PAGE * +page,
            take: PRODUCTS_PER_PAGE,
            relations: {
                stockItems: true, 
                category: true,
            },
            where: {
                stockItems : {
                    status: Equal(1)
                },
                price: LessThan(+value),
            }
        }

        let res: Product[] = await repository.find(findOptions);
        response.status(StatusCodes.OK).send(res);
    }
    
    @apimethod
    async  getByName (request: Request, response:Response){
        let { name, page } = request.params;
        const repository = AppDataSource.getRepository(Product);

        const findOptions: FindManyOptions = {
            skip: PRODUCTS_PER_PAGE * +page,
            take: PRODUCTS_PER_PAGE,
            relations: ["stockItems"],
            where: {
                stockItems : {
                    status: Equal(1)
                },
                name: Like(`%${name}%`),
            }
        }

        let res: Product[] = await repository.find(findOptions);
        response.status(StatusCodes.OK).send(res);
    }
        
    @apimethod
    async  updatePrice(request: Request, response:Response){        
        let { id, newPrice } = request.body;
        const repository = AppDataSource.getRepository(Product);

        let product: Product = await repository.findOneBy({id:id});
        product.price = newPrice;
       
        let res = await repository.save(product);
        response.status(StatusCodes.OK).send(res);
    }

    @apimethod
    async save(request: Request, response: Response): Promise<void>{
        let entity: Product = { ...request.body } ;
        const repository = AppDataSource.getRepository(Product);
        console.log("entrou")
        // if(entity.categoryId == null)
        //     throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Não é possível inserir produto com categoria vazia!")

        if(entity.description == null || entity.description.trim() == "")
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Não é possível inserir produto com descrição vazia!")

        if(entity.description == null || entity.image.trim() == "")
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Não é possível inserir produto com imagem vazia!")

        if(entity.description == null || entity.name.trim() == "")
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Não é possível inserir produto com nome vazio!")

        if(entity.category == null)
            entity.category = new Category();
            entity.category.id = entity.categoryId;

        let res = await repository.save(
            repository.create(entity)
        );
        

        if(res.id){
            res.stockItemIds = []
    
            const stockItemRepository = AppDataSource.getRepository(StockItem);
            
            for(let i = 0; i < entity.quantity; i++ ){
                let stockItem = new StockItem()
                
                stockItem.status = AVAILABLE;
                stockItem.product = res ;

                console.log(stockItem)
                res.stockItemIds.push((await stockItemRepository.save(
                    stockItemRepository.create(stockItem))).id);
            }
        }

        response.status(StatusCodes.CREATED).send(res);
    }
    

}    

export default ProductController;
