import "reflect-metadata";
import UserTypeRouter  from "./routes/userType";
import ProductRouter   from "./routes/product";
import UserRouter  from "./routes/user";

import express from "express";
import { AppDataSource } from "./data-source";

const app = express();

AppDataSource.initialize().then(() => {
    console.log("Conexão com o banco de dados estabelecidade com sucesso!")
}).catch(error => {
    console.log(error)
});


app.use(express.json()); 
app.use("/product", ProductRouter);
app.use("/user", UserRouter);
app.use("/user_type", UserTypeRouter);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Servidor sendo executado na porta ${PORT}`));