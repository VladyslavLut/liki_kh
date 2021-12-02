const catalogController = require('../controllers/catalog.controller')

module.exports = {
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
    search: async (request, response) => {
        console.log(request.query)
        const query = request.query.q //TODO: or default
        const category = request.query.category //TODO: or default
        const order = request.query.order //TODO: or default

        //todo: get all medicines for category sorted by order
        const catalog = [
            {name: query, category: category},
            {name: 'medicine2', category: category}
        ]

        return response.status(200).json({
            order: order,
            catalog: catalog
        })
    }
}