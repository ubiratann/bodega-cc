const status  = require("http-status-codes").StatusCodes

module.exports = {

    async getAll(req, res){
        /*
            #swagger.tags = ['Produto']
            #swagger.summary = 'Recupera todos os produtos'
            #swagger.description = 'Recupera todos os produtos dispóniveis no banco de dados'

        */
        try{
            products = [] // select * from products;
            res.send(status.OK, {
                body : JSON.stringify(items)
            })
        }
        catch (error){
            res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }
    },

    async getByCategory(req, res){
        /*
            #swagger.tags = ['Produto']
            #swagger.summary = 'Recupera produtos por categoria'
            #swagger.description = 'Recupera todos os os produtos de uma categoria'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'Id da categoria',
                required: true,
                type: 'number',
                format: 'int64',
            }
            #swagger.responses[200] = {
                description: 'Busca realizada com sucesso !'
            }
            #swagger.response[500]: 'Erro interno no servidor'
        */
        try{
            products = [] // select * from products where category = req.params.id;
            res.send(status.OK,{ 
                body : JSON.stringify(products)
            })
        }
        catch (error){
            res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }
    },

    async getByHigherValue(req, res){
        /*
            #swagger.tags = ['Produto']
            #swagger.summary = 'Recupera produtos com valores superiores ao informado'
            #swagger.description = 'Recupera produtos com valores superiores ao informado no corpo da requisição'
            #swagger.parameters['value'] = {
                in: 'path',
                description: 'Valor',
                required: true,
                type: 'number',
                format: 'float'
            }
            #swagger.responses[200] = {
                description: 'Busca realizada com sucesso !'
            }
            #swagger.responses[500] = {
                description: 'Erro interno no servidor'
            }
        */
        try {
            products = [] // select * from products as p where p.price > req.params.value;
            res.send(status.OK, {
                body : JSON.stringify(products)
            })
        }catch (error){
                res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }
    },

    async getByLowerValue(req, res){
        /*
            #swagger.tags = ['Produto']
            #swagger.summary = 'Recupera produtos com valores inferiores ao informado'
            #swagger.description = 'Recupera produtos com valores inferiores ao informado no corpo da requisição'
            #swagger.parameters['value'] = {
                in: 'path',
                description: 'Valor',
                required: true,
                type: 'number',
                format: 'float'
            }
            #swagger.responses[200] = {
                description: 'Busca realizada com sucesso !'
            }
            #swagger.responses[500] = {
                description: 'Erro interno no servidor'
            }
        */
        try {
            products = [] // select * from products as p where p.price < req.params.value;
            res.send(status.OK, {
                body : JSON.stringify(products)
            })
        }catch (error){
                res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }   
    },

    async getByName (req, res){
        /*
            #swagger.tags = ['Produto']
            #swagger.summary = 'Recupera produtos filtrando por nome'
            #swagger.description = 'Recupera produtos que possuem nomes parecidos com o nome informado'
            #swagger.parameters['name'] = {
                in: 'path',
                description: 'Nome que será pesquisado',
                required: true,
                type: 'string',
                format: 'string',
            }

            #swagger.responses[200] = {
                description: 'Busca realizada com sucesso !'
            }

            #swagger.responses[404] = {
                description: 'Nenhum produto encontrado'
            }

            #swagger.responses[500] = {
                description: 'Erro interno no servidor'
            }
        */
        try {
            products = [] // select * from products as p where p.name = req.params.name;
            if (products.length > 0){
                res.send(status.OK, {
                    message: `Found ${products.length} items !`,
                    body : JSON.stringify(products)
                })
            }
            else{
                res.send(status.NOT_FOUND, {
                    message: "No items were found !",
                    body : JSON.stringify(products)
                })
            }
        }catch (error){
                res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }   
    },

    async create(req, res){
        /*
            #swagger.tags = ['Produto']
            #swagger.summary = 'Cria produto'
            #swagger.description = 'Insere produtos no bancos de dados'
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Json com campos do produto',
                required: true,
                type: 'string',
                format: 'string',
                schema : {
                    name: "Régua",
                    category: 1,
                    value: 3.50,
                    description: "Régua de 20 cm",
                    quantity: 2,
                    image: "path_to_image_or_url"
                }
            }
    
            #swagger.responses[200] = {
                description: 'Produto criado com sucesso !'
            }

            #swagger.responses[500] = {
                description: 'Erro interno no servidor'
            }
        */
        try {
            const product = {
                id,
                name,
                category,
                value,
                description,
                quantity,
                image
            } 
            // insert into products values (...product);
            product = req.body
            res.send(status.OK, {
                message : "Created with sucess!",
                body: JSON.stringify(product)
            })
        }catch (error){
                res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }   
    },

    async delete(req, body){
        /* 	#swagger.tags = ['Produto']
            #swagger.summary = 'Deleta produto'
            #swagger.description = 'Deleta produto do banco de dados'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'Id do produto',
                required: true,
                type: 'number',
                format: 'int64'
            }
        */
        try {
            // delete from products where id = req.params.id;
            res.send(status.OK, {
                message : "Item deleted from database !"
            })
        }catch (error){
                res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }  
    },

    async updatePrice(req, body){
        /*	#swagger.tags = ['Produto']
            #swagger.summary = 'Atualiza preço do produto'
            #swagger.description = 'Atualiza preço de um produto no banco de dados'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'Id do produto',
                required: true,
                type: 'number',
                format: 'int64'
            }
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Json com novo valor',
                required: true,
                type: 'number',
                format: 'int64'
                schema : {
                    value : 1.99
                }
            }
        */  
        try {
            // needs a ORM to update only the changed fields;
            res.send(status.OK, {
                message : "Item updated with sucess !",
                body :bu 
            })
        }catch (error){
                res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }         
    },

    async reserve(req, body){
        /*	#swagger.tags = ['Produto']
            #swagger.summary = 'Reserva produto'
            #swagger.description = 'Reserva um produto no banco de dados'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'Id do produto',
                required: true,
                type: 'number',
                format: 'int64'
            }
            #swagger.parameters['quantity'] = {
                in: 'body',
                description: 'Quantidade a ser reservada',
                required: true,
                type: 'number',
                format: 'int64',
                schema : {
                    quantity: 3
                }
            }
        */
        try {
            res.send(status.OK, {
                message : "Item reserved with sucess !"
            })
        }catch (error){
                res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }         
    },



}
