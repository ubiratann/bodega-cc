const sequelize = require("sequelize");
const db        = require("../database/connection");

const Category = db.define("category", {
    id: {
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: sequelize.DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Category;