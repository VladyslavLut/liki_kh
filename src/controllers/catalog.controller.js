const Category = require('../models/category.model')
const Medicine = require('../models/medicine.model')
const Ingredient = require('../models/ingredient.model')

module.exports = {
    findAllCategories: async () => {
        return await Category.findAll({order: ['name']})
    },
    findMedicine: async (id) => {
        const model = await Medicine
            .findOne({
                attributes: ['id', 'name', 'factoryName', 'imageUrl', 'instruction'],
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
    }
}