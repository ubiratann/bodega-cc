import { StatusCodes } from "http-status-codes";
import { Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { ApiError } from "../util/apiError";
import { apimethod } from "../decorators/apimethod";
import { StockItem } from "../models/stockItem";
import { Equal, FindOneOptions, FindManyOptions } from "typeorm";
import { Reserve } from "../models/reserve";
import { ReserveItem } from "../models/reserveItem";
import { User } from "../models/user";

const AVAILABLE = 1
const RESERVED = 2

class ReserveController {
    
    @apimethod
    async save(request: Request, response: Response){
        const data = request.body;
        console.log(data);

        const userRepository = AppDataSource.getRepository(User);
        const stockItemRepository = AppDataSource.getRepository(StockItem);
        const reserveRepository = AppDataSource.getRepository(Reserve);
        const reserveItemRepository = AppDataSource.getRepository(ReserveItem);

        if(data.userId == null)
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Não é possível inserir reserva com usurario vazio!")
        if(data.stockItemIds == null || data.stockItemIds.length == 0)
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Não é possível inserir reserva sem stock itens vazio!")

        let user = await userRepository.findOne({
            where: {
                id: Equal(data.userId)
            },
        });

        let reserve = new Reserve();
        reserve.userId = data.userId;
        reserve.user = user;
        reserve = await reserveRepository.save(
            reserveRepository.create(reserve)
        );

        let errors = [];
        for (let i = 0; i < data.stockItemIds.length; i++) {
            const id = data.stockItemIds[i];

            try {
                const findOptions: FindOneOptions = {
                    where: {
                        status: Equal(AVAILABLE),
                        id: Equal(id)
                    },
                }

                let stockItem = await stockItemRepository.findOne(findOptions);

                if (stockItem != null) {
                    stockItem.status = RESERVED;
                    stockItem = await stockItemRepository.save(
                        stockItemRepository.create(stockItem)
                        );
                        
                    let reserveItem = new ReserveItem();
                    reserveItem.reserveId = reserve.id;
                    reserveItem.reserve = reserve;
                    reserveItem.stockItemId = stockItem.id;
                    reserveItem.stockItem = stockItem;
                    
                    await reserveItemRepository.save(
                        reserveItemRepository.create(reserveItem)
                        );

                } else {
                    errors.push(`Item ${id} not found or not available.`);
                }
            } catch (err) {
                errors.push(`Error while trying to reserve item ${id}. - ${err}`);
            }
        }

        response.status(StatusCodes.OK).send({ errors: errors });
    }

    @apimethod
    async get(request: Request, response:Response){
        let { userId } = request.params;
        const repository = AppDataSource.getRepository(ReserveItem);

        console.log("Here!");

        const findOptions: FindManyOptions = {
            relations: {
                reserve: true,
                stockItem: {
                    product: true
                }
            },
            where: {
                reserve: {
                    user: {
                        id: Equal(userId)
                    }
                }
            },
        }

        let res: ReserveItem[] = await repository.find(findOptions);
        response.status(StatusCodes.OK).send(res);
    }
}

export default ReserveController;