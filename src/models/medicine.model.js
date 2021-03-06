const db = require('../database/connection')
const sequelize = db.sequelize
const Sequelize = db.Sequelize

const Medicine = sequelize.define("medicine", {
    id: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    categoryId: Sequelize.INTEGER(),
    imageUrl: Sequelize.STRING(255),
    factoryName: Sequelize.STRING(255),
    instruction: Sequelize.TEXT()
}, db.tableConfig);

module.exports = Medicine