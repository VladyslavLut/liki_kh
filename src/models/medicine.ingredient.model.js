const db = require('../database/connection')
const sequelize = db.connection
const Sequelize = db.Sequelize

const MedicineIngredient = sequelize.define("medicine_ingredient", {
    amount: Sequelize.INTEGER()
}, db.tableConfig);

module.exports = MedicineIngredient