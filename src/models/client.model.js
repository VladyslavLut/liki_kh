const db = require('../database/connection')
const sequelize = db.connection
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
});

module.exports = Client