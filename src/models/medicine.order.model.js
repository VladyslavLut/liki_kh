const db = require('../database/connection')
const sequelize = db.sequelize
const Sequelize = db.Sequelize

const MedicineOrder = sequelize.define("medicine_order", {
    orderId: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        primaryKey: true
    },
    medicineId: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        primaryKey: true
    },
    count: {
        type: Sequelize.INTEGER(),
        allowNull: false
    }
}, db.tableConfig);

module.exports = MedicineOrder