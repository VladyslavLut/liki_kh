const catalogController = require('../controllers/catalog.controller')

module.exports = {
    getOrderings: async (request, response, next) => {
        const orderings = await catalogController.findAllOrderings().catch(next)
        response.status(200).json({orderings: orderings})
    },
    getCategories: async (request, response, next) => {
        const categories = await catalogController.findAllCategories().catch(next)
        response.status(200).json({categories: categories})
    },
    getMedicine: async (request, response, next) => {
        const id = request.params.medicineId
        const medicine = await catalogController.findMedicine(id).catch(next)
        if (medicine) {
            response.status(200).json(medicine);
        } else {
            response.status(404).json({message: 'Not found'})
        }
    },
    search: async (request, response, next) => {
        const params = request.query
        const query = params.q ? params.q : ''
        const category = params.category ? params.category : ''
        const order = params.order ? params.order : ''

        const catalog = await catalogController.search(query, category, order).catch(next)

        return response.status(200).json({catalog: catalog})
    }
}