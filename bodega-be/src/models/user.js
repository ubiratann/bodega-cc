const sequelize = require("sequelize");
const db        = require("../database/connection");

const User = db.define("user", {
    id: {
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    email: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;