require('./connection')
const Category = require('../models/category.model')
const Ingredient = require('../models/ingredient.model')
const Pharmacy = require('../models/pharmacy.model')
const Client = require('../models/client.model')
const Order = require('../models/order.model')
const Basket = require('../models/basket.model')
const Medicine = require('../models/medicine.model')
const MedicineIngredient = require('../models/medicine.ingredient.model')
const MedicinePharmacy = require('../models/medicine.pharmacy.model')
const MedicineOrder = require('../models/medicine.order.model')

Category.hasMany(Medicine, {foreignKey: 'category_id'})
Medicine.belongsTo(Category, {foreignKey: 'category_id'})

Medicine.belongsToMany(Ingredient, {through: MedicineIngredient})
Ingredient.belongsToMany(Medicine, {through: MedicineIngredient})

Medicine.belongsToMany(Pharmacy, {through: MedicinePharmacy})
Pharmacy.belongsToMany(Medicine, {through: MedicinePharmacy})

MedicinePharmacy.hasMany(Basket)
Basket.belongsTo(MedicinePharmacy)

Pharmacy.hasMany(Order)
Order.belongsTo(Pharmacy)

Client.hasMany(Order)
Order.belongsTo(Client)

Order.belongsToMany(Medicine, {through: MedicineOrder})
Medicine.belongsToMany(Order, {through: MedicineOrder})