const db = require('../database/connection')
const sequelize = db.connection
const Sequelize = db.Sequelize

const Pharmacy = sequelize.define("pharmacy", {
    id: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    address: {
        type: Sequelize.STRING(255)
    }
});

module.exports = Pharmacy