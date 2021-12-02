const db = require('../database/connection')
const sequelize = db.sequelize
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
}, db.tableConfig);

module.exports = Pharmacy