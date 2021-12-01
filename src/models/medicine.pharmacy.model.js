const db = require('../database/connection')
const sequelize = db.connection
const Sequelize = db.Sequelize

const MedicinePharmacy = sequelize.define("medicine_pharmacy", {
    id: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    pharmacyId: Sequelize.INTEGER(),
    medicineId: Sequelize.INTEGER(),
    price: Sequelize.INTEGER()
});

module.exports = MedicinePharmacy