class Cart {
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
}

export default Cart;