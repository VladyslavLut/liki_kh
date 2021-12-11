const PharmacyController = require('../controllers/pharmacy.controller')

module.exports = {
    search: async (request, response, next) => {
        const query = request.query.q ? request.query.q : ''
        const medicineId = parseInt(request.params.medicineId)
        if (isNaN(medicineId)) {
            return response.status(400).json({
                message: 'Invalid medicine id'
            })
        }
        const pharmacies = await PharmacyController.findAll(
            medicineId, query, query
        ).catch(next);
        return response.status(200).json({
            pharmacies: pharmacies
        })
    }
}