const status  = require("http-status-codes").StatusCodes

module.exports = {
    async create(req, res){
        /* 	#swagger.tags = ['Usuário']
            #swagger.summary = 'Registro do usuário'
            #swagger.description = 'JSON com informações de registro'
            #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Quantidade a ser reservada',
                required: true,
                schema : {
                    name: "name",
                    email: "email@email.com",
                    password: "password"
                }
            }

            #swagger.responses[200] = {
                description: 'Usuário cadastrado com sucesso !',
                schema : {
                    name: "name",
                    email: "email@email.com",
                    password: "password"
                }
            }
            #swagger.responses[400] = {
                description: 'Algum dado obrigatório não foi preenchido!'
            }
            #swagger.responses[500] = {
                description: 'Erro interno no servidor'
            }
        */
        try{
            const { email, name, password } = req.body 
            // @todo: Add handler to email allready in use             
            if (!(email || name || password)){
                res.send(status.BAD_REQUEST, {
                })
            }else{
                // insert into user values (nextval(id), name, email, password) ;
                res.send(status.OK,{ 
                })
            }
            
        }
        catch (error){
            res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }
    },

    async login(req, res){
        /*
         	#swagger.tags = ['Usuário']
            #swagger.summary = 'Login do usuário'
            #swagger.description = 'Loga usuário no sistema'
            #swagger.parameters['obj'] = {
                in: 'body',
                description: 'JSON com informações de login',
                required: true,
                schema : {
                    email: "email@email.com",
                    password: "password"
                }
            }

            #swagger.responses[200] = {
                description: 'Usuário logado no sistema!'
            }
            #swagger.responses[401] = {
                description: 'Credenciais inválidas!'
            }
            #swagger.responses[500] = {
                description: 'Erro interno no servidor!'
            }
        */
        try{
            const { email, password } = req.body 
            // select * from users where login = req.body.login and password=req.body.password;
            if(user){
                res.send(status.OK,{ 
                })
            }
            else{
                res.send(status.UNAUTHORIZED,{ 
                })
            }
        }
        catch (error){
            res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }
    }
}