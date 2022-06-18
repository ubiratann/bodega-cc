const sequelize = require("sequelize");
const db        = require("../database/connection");

const Sale = db.define("sale", {
    id: {
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }
});

module.exports = Sale;