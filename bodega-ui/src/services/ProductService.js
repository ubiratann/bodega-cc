import axios from "axios";

const baseUrl = "http://localhost:4000/product";

class ProductService {
    static create = (name, price, description, quantity, image, categoryId) => {
        return axios.post(`${baseUrl}`, {
            name: name,
            price: price,
            description: description,
            quantity: quantity,
            image: image,
            categoryId: categoryId
        });
    };

    static get = (page) => {
        return axios.get(`${baseUrl}/${page}`);
    }

    static getAll = async () => {
        const products = [];
        let page = 0, resp;

        do {
            resp = (await this.get(page)).data;
            for (let i = 0; i < resp.length; i++) {
                products.push(resp[i]);
            }
            page++;
        } while (resp.length > 0);

        return products;
    };
}

export default ProductService;