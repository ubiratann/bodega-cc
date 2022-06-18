const sequelize = require("sequelize");
const db        = require("../database/connection");

const Product = db.define("product",{
    id: {
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },  
    category: {
        type: sequelize.DataTypes.INTEGER,
        allowNull: false
    },  
    price: {
        type: sequelize.DataTypes.REAL,
        allowNull: false
    },
    description: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Product;