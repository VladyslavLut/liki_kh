const db = require('./connection')
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

//Many medicines of one category
Category.hasMany(Medicine, {foreignKey: 'category_id'})
Medicine.belongsTo(Category, {foreignKey: 'category_id'})

//Many medicines have many ingredients
Medicine.hasMany(MedicineIngredient, {foreignKey: 'medicine_id'})
MedicineIngredient.belongsTo(Medicine, {foreignKey: 'medicine_id'})

Ingredient.hasMany(MedicineIngredient, {foreignKey: 'ingredient_id'})
MedicineIngredient.belongsTo(Ingredient, {foreignKey: 'ingredient_id'})

//Many pharmacies have many medicines
Medicine.hasMany(MedicinePharmacy, {foreignKey: 'medicine_id'})
MedicinePharmacy.belongsTo(Medicine, {foreignKey: 'medicine_id'})

Pharmacy.hasMany(MedicinePharmacy, {foreignKey: 'pharmacy_id'})
MedicinePharmacy.belongsTo(Pharmacy, {foreignKey: 'pharmacy_id'})

// Many baskets have a medicine from exact pharmacy
MedicinePharmacy.hasMany(Basket, {foreignKey: 'medicine_pharmacy_id'})
Basket.belongsTo(MedicinePharmacy, {foreignKey: 'medicine_pharmacy_id'})

//Many orders belong to one pharmacy
Pharmacy.hasMany(Order, {foreignKey: 'pharmacy_id'})
Order.belongsTo(Pharmacy, {foreignKey: 'pharmacy_id'})

//Many orders belong to one client
Client.hasMany(Order, {foreignKey: 'client_id'})
Order.belongsTo(Client, {foreignKey: 'client_id'})

//Many orders contain many medicines
Order.hasMany(MedicineOrder, {foreignKey: 'order_id'})
MedicineOrder.belongsTo(Order, {foreignKey: 'order_id'})

Medicine.hasMany(MedicineOrder, {foreignKey: 'medicine_id'})
MedicineOrder.belongsTo(Medicine, {foreignKey: 'medicine_id'})