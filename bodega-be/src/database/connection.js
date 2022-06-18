const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER || "root", process.env.MYSQL_USER_PASSWORD || "qwe123", {
    dialect: "mysql",
    host: "localhost",
    port: process.env.PORT || "3306",
    logging: false
});


module.exports = sequelize;