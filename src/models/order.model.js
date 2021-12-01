const db = require('../database/connection')
const moment = require('moment-timezone');
const sequelize = db.connection
const Sequelize = db.Sequelize

const Order = sequelize.define("order", {
    id: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    pharmacyId: Sequelize.INTEGER(),
    clientId: Sequelize.INTEGER(),
    date: {
        type: Sequelize.NOW,
        allowNull: false,
        defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss')
    }
}, db.tableConfig);

module.exports = Order