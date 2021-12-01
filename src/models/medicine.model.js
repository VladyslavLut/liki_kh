const db = require('../database/connection')
const sequelize = db.connection
const Sequelize = db.Sequelize

const Medicine = sequelize.define("medicine", {
    id: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    categoryId: Sequelize.INTEGER(),
    phone: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    imageUrl: Sequelize.STRING(255),
    factoryName: Sequelize.STRING(255),
    instruction: Sequelize.TEXT()
}, db.tableConfig);

module.exports = Medicine