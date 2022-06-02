const status  = require("http-status-codes").StatusCodes

module.exports = {
    async create(req, res){
        try{
            const { email, name, password } = req.body 
            if (!(email || name || password)){
                res.send(status.BAD_REQUEST, {
                    "message" : "you need to fill all fields !"
                })
            }else{
                // insert into user values (nextval(id), name, email, password) ;
                res.send(status.OK,{ 
                    "message" : "User created !"     
                })
            }
        }
        catch (error){
            res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }
    },

    async login(req, res){
        try{
            const { email, password } = req.body 
            // select * from users where login = req.body.login and password=req.body.password;
            if(user){
                res.send(status.OK,{ 
                    "message" : "The user is logged in !"
                })
            }
            else{
                res.send(status.UNAUTHORIZED,{ 
                    "message" : "Invalid credentials !"
                })
            }
        }
        catch (error){
            res.send(status.INTERNAL_SERVER_ERROR, error["message"])
        }
    }
}