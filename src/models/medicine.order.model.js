const db = require('../database/connection')
const sequelize = db.connection
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
});

module.exports = MedicineOrder