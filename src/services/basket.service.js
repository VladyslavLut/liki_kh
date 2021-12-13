const CheckoutController = require('../controllers/checkout.controller')

module.exports = {
    get: async (request, response, next) => {
        const body = request.body
        const id = body.id ? body.id : NaN

        const basket = await CheckoutController.findBasket(id).catch(next)

        return response.status(200).json({basket: basket})
    },
    add: async (request, response, next) => {
        const body = request.body
        const id = body.id ? body.id : NaN
        const medicineId = body.medicineId ? body.medicineId : NaN
        const pharmacyId = body.pharmacyId ? body.pharmacyId : NaN

        const basket = await CheckoutController
            .addToBasket(id, medicineId, pharmacyId)
            .catch(error => {
                if (error instanceof BadRequestError) {
                    return response.status(400).json({message: error.message})
                } else {
                    next(error)
                }
            })

        return response.status(200).json({basket: basket})
    },
    remove: async (request, response, next) => {
        const body = request.body
        const id = body.id ? body.id : NaN
        const medicineId = body.medicineId ? body.medicineId : NaN
        const pharmacyId = body.pharmacyId ? body.pharmacyId : NaN

        const basket = await CheckoutController
            .removeFromBasket(id, medicineId, pharmacyId)
            .catch(error => {
                if (error instanceof BadRequestError) {
                    return response.status(400).json({message: error.message})
                } else {
                    next(error)
                }
            })

        return response.status(200).json({basket: basket})
    },
    delete: async (request, response, next) => {
        const body = request.body
        const id = body.id ? body.id : NaN
        const medicineId = body.medicineId ? body.medicineId : NaN
        const pharmacyId = body.pharmacyId ? body.pharmacyId : NaN

        const basket = await CheckoutController
            .deleteFromBasket(id, medicineId, pharmacyId)
            .catch(error => {
                if (error instanceof BadRequestError) {
                    return response.status(400).json({message: error.message})
                } else {
                    next(error)
                }
            })

        return response.status(200).json({basket: basket})
    },
    checkout: async (request, response, next) => {
        const body = request.body
        const id = body.id ? body.id : NaN
        const phone = body.phone ? body.phone : ''
        const email = body.email ? body.email : ''

        if (!phone) {
            return response.status(400).json({message: 'Phone must not be empty'})
        }

        const receipt = await CheckoutController
            .checkout(id, phone, email)
            .catch(next);

        return response.status(200).json({basket: receipt})
    }
}