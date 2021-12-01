const db = require('../database/connection')
const sequelize = db.connection
const Sequelize = db.Sequelize

const Category = sequelize.define("category", {
    id: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    }
});

module.exports = Category