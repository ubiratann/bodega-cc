const status  = require("http-status-codes").StatusCodes

module.exports = {

    async getAll(req, res){
        try{
            products = [] // select * from products;
            res.send(status.OK, {
                "products" : JSON.stringify(items)
            })
        }
        catch (error){
            res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }
    },

    async getByCategory(req, res){
        try{
            products = [] // select * from products where category = req.params.id;
            res.send(status.OK,{ 
                "products" : JSON.stringify(products)
            })
        }
        catch (error){
            res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }
    },

    async getByHigherValue(req, res){
        try {
            products = [] // select * from products as p where p.price > req.params.value;
            res.send(status.OK, {
                "products" : JSON.stringify(products)
            })
        }catch (error){
                res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }
    },

    async getByLowerValue(req, res){
        try {
            products = [] // select * from products as p where p.price < req.params.value;
            res.send(status.OK, {
                "products" : JSON.stringify(products)
            })
        }catch (error){
                res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }   
    },

    async getByName (req, res){
        try {
            products = [] // select * from products as p where p.name = req.params.name;
            res.send(status.OK, {
                "body" : JSON.stringify(products)
            })
        }catch (error){
                res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }   
    },

    async create(req, res){
        try {
            // insert into products values (...req.body);
            res.send(status.OK, {
                "message" : JSON.stringify(products)
            })
        }catch (error){
                res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }   
    },

    async delete(req, body){
        try {
            // delete from products where id = req.params.id;
            res.send(status.OK, {
                "message" : "Item deleted from database !"
            })
        }catch (error){
                res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }  
    },

    async updatePrice(req, body){
        try {
            // needs a ORM to update only the changed fields;
            res.send(status.OK, {
                "message" : "Item updated with sucess !"
            })
        }catch (error){
                res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }         
    },

    async reserve(req, body){
        try {
            res.send(status.OK, {
                "message" : "Item reserved with sucess !"
            })
        }catch (error){
                res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }         
    }

}

