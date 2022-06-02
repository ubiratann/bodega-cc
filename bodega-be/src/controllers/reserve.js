const status  = require("http-status-codes").StatusCodes
module.exports = {
    async create(req, res){
        /*	#swagger.tags = ['Reserva Produto']
            #swagger.summary = 'Reserva um produto'
            #swagger.description = 'Reserva um produto no banco de dados associando produto, quantidade e usuário'
            #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Objeto com informações para criar reserva',
                required: true,
                schema : {
                    product_id: 1,
                    user_id : 2,
                    quantity: 3,
                    inclusion_time : "25/01/1999"
                }
            }

            #swagger.responses[200] = {
                description: 'Produto reservado com sucesso!',
                schema : {
                    product_id: 1,
                    user_id : 2,
                    quantity: 3,
                    inclusion_time : "25/01/1999"
                }
            }
            #swagger.responses[403] = {
                description: 'Não foi possível efetuar essa reserva!'
            }
            #swagger.responses[500] = {
                description: 'Erro interno no servidor!'
            }
        */
        try {

            const reserve = { product, user_id, quantity, inclusion_time} = req.body
            res.send(status.OK, {
                message : "Item reserved with sucess !"
            })

        }catch (error){
                res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }         
    },

}