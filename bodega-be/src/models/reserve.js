const sequelize = require("sequelize");
const db        = require("../database/connection");

const Reserve = db.define("reserve", {
    id: {
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }
});

module.exports = Reserve;