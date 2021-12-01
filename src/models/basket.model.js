const db = require('../database/connection')
const sequelize = db.connection
const Sequelize = db.Sequelize

const Basket = sequelize.define("basket", {
    id: {
        type: Sequelize.STRING(64),
        allowNull: false,
        primaryKey: true
    },
    medicinePharmacyId: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        primaryKey: true
    },
    count: Sequelize.INTEGER()
});

module.exports = Basket