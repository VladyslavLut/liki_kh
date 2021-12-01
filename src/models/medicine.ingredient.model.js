const db = require('../database/connection')
const sequelize = db.connection
const Sequelize = db.Sequelize

const MedicineIngredient = sequelize.define("medicine_ingredient", {
    medicineId: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        primaryKey: true
    },
    ingredientId: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        primaryKey: true
    },
    amount: Sequelize.INTEGER()
});

module.exports = MedicineIngredient