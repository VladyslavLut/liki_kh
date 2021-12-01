const db = require('../database/connection')
const sequelize = db.connection
const Sequelize = db.Sequelize

const Ingredient = sequelize.define("ingredient", {
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
}, db.tableConfig);

module.exports = Ingredient