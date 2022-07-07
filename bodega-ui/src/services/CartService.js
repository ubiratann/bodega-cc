import axios from "axios";
import AuthService from "./AuthService";

const baseUrl = "http://localhost:4000/product";

class CartService {
    constructor() {
        this.items = {};
    }

    add = (product) => {
        if (this.items.hasOwnProperty(product.id)) {
            if (this.items[product.id] < product.quantity) {
                this.items[product.id]++;
            }
        } else {
            if (product.quantity > 0) {
                this.items[product.id] = 1;
            }
        }
    }

    remove = (product) => {
        if (this.items.hasOwnProperty(product.id)) {
            this.items[product.id]--;
            if (this.items[product.id] == 0) {
                delete this.items[product.id];
            }
        }
    }

    get = (product) => {
        if (this.items.hasOwnProperty(product.id)) {
            return this.items[product.id];
        }
        return 0;
    }

    reset = () => {
        this.items = {};
    }

    submit = async (products) => {
        const getStockItemIds = (product, number) => {
            let stockItemIds = [];
            for(let i = 0; i < number; i++) {
                stockItemIds.push(product.stockItems[i].id);
            }
            return stockItemIds;
        };

        let stockItemIds = [];
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            if (this.items.hasOwnProperty(product.id)) {
                stockItemIds = stockItemIds.concat(getStockItemIds(product, this.items[product.id]));
            }
        }

        const auth = AuthService.getInstance();
        const userId = auth.userId;

        const payload = {
            userId: userId,
            stockItemIds: stockItemIds
        }

        console.log(payload);

        return axios.put(`${baseUrl}`, payload);
    }
}

export default CartService;