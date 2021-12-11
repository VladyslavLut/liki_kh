const {Op} = require("sequelize");
const Pharmacy = require('../models/pharmacy.model')
const MedicinePharmacy = require('../models/medicine.pharmacy.model')

module.exports = {
    findAll: async (medicineId, name, address) => {
        const pharmacyName = name ? name : ''
        const pharmacyAddress = address ? address : ''
        const pharmacies = await MedicinePharmacy.findAll({
                where: {medicineId: medicineId},
                include: [
                    {
                        model: Pharmacy,
                        where: {
                            [Op.or]: [
                                {name: {[Op.substring]: pharmacyName}},
                                {address: {[Op.substring]: pharmacyAddress}}
                            ]
                        }
                    }
                ],
                order: [['pharmacy', 'name', 'ASC']]
            }
        )
        return pharmacies.map(entity => {
            return {
                id: entity.pharmacy.id,
                name: entity.pharmacy.name,
                address: entity.pharmacy.address,
                price: entity.price
            }
        })
    }
}