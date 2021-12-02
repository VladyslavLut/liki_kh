const db = require('../database/connection')
const sequelize = db.sequelize
const Sequelize = db.Sequelize

const Client = sequelize.define("client", {
    id: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    phone: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    email: Sequelize.STRING(255)
}, db.tableConfig);

module.exports = Client