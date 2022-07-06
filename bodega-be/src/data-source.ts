import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "qwe123",
    database: "bodega_cc",
    synchronize: true,
    entities:  ["src/models/*.ts"]
});

export { AppDataSource} ;