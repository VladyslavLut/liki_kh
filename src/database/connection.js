const Sequelize = require('sequelize')

const db = {}
const connection = new Sequelize("QAGAVx9yun", "QAGAVx9yun", "WMn9qj8kql", {
    host: "remotemysql.com",
    port: 3306,
    dialect: "mysql",
    underscored: true,
    freezeTableName: true,
    operatorsAliases: false
})

db.connection = connection
db.Sequelize = Sequelize

module.exports = db
