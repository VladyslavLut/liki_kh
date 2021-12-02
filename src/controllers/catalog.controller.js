const db = require('../database/connection')
const {QueryTypes} = require("sequelize");
const Category = require('../models/category.model')
const Medicine = require('../models/medicine.model')
const Ingredient = require('../models/ingredient.model')
const MedicineOrder = require('../enums/medicine.order.enum')

function defineCatalogOrder(order) {
    switch (order) {
        case MedicineOrder.expensiveFirst:
            return 'price DESC'
        case MedicineOrder.cheapFirst:
            return 'price ASC'
        case MedicineOrder.zFirst:
            return 'm.name DESC'
        case MedicineOrder.aFirst:
        default:
            return 'm.name ASC'
    }
}
function groupIngredientsByMedicine(catalog) {
    const grouped = []
    catalog.forEach(medicine => {
        const index = grouped.length - 1
        const previous = grouped.length > 0 ? grouped[index] : undefined
        const ingredient = {
            name: medicine.ingredientName,
            amount: medicine.ingredientAmount
        }
        if (previous && previous.id === medicine.id) {
            grouped[index].ingredients.push(ingredient)
        } else {
            grouped.push({
                id: medicine.id,
                name: medicine.name,
                factoryName: medicine.factoryName,
                imageUrl: medicine.imageUrl,
                price: medicine.price,
                category: medicine.category,
                ingredients: [ingredient]
            })
        }
    })
    return grouped
}

module.exports = {
    findAllOrderings: async () => {
        return [MedicineOrder.aFirst, MedicineOrder.zFirst, MedicineOrder.cheapFirst, MedicineOrder.expensiveFirst]
    },
    findAllCategories: async () => {
        return await Category.findAll({order: ['name']})
    },
    findMedicine: async (id) => {
        const model = await Medicine.findOne({
            where: {id: id},
            include: [
                Category,
                Ingredient
            ]
        })
        return {
            id: model.id,
            name: model.name,
            factoryName: model.factoryName,
            imageUrl: model.imageUrl,
            category: model.category.name,
            ingredients: model.ingredients.map(ingredient => {
                return {
                    name: ingredient.name,
                    amount: ingredient.medicine_ingredient.amount
                }
            }),
            instruction: model.instruction
        }
    },
    search: async (query, category, order) => {
        const medicineName = query ? query : ''
        const categoryName = category ? category : '%%'
        const medicineOrder = order ? order : MedicineOrder.aFirst

        const catalog = await db.sequelize.query('SELECT m.id,\n' +
            '       m.name,\n' +
            '       m.factory_name AS factoryName,\n' +
            '       m.image_url    AS imageUrl,\n' +
            '       mp.price       AS price,\n' +
            '       c.name         AS category,\n' +
            '       i.name         AS `ingredientName`,\n' +
            '       mi.amount      AS `ingredientAmount`\n' +
            'FROM medicine AS m\n' +
            '         INNER JOIN category AS c ON m.category_id = c.id\n' +
            '         INNER JOIN (medicine_ingredient AS mi INNER JOIN ingredient AS i ON i.id = mi.ingredient_id)\n' +
            '                    ON m.id = mi.medicine_id\n' +
            '         INNER JOIN medicine_pharmacy mp on m.id = mp.medicine_id\n' +
            `WHERE (m.name LIKE \'%${medicineName}%\'\n OR i.name LIKE \'%${medicineName}%\')\n` +
            `  AND c.name LIKE \'${categoryName}\'\n` +
            '  AND mp.price = (SELECT mp2.price\n' +
            '                  FROM medicine_pharmacy as mp2\n' +
            '                  WHERE mp2.medicine_id = m.id\n' +
            '                  ORDER BY mp2.price\n' +
            '                  LIMIT 1)\n' +
            `ORDER BY ${defineCatalogOrder(medicineOrder)};`, {type: QueryTypes.SELECT})

        return groupIngredientsByMedicine(catalog)
    }
}