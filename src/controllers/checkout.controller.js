const hash = require('string-hash-64')
const Basket = require('../models/basket.model')
const MedicinePharmacy = require('../models/medicine.pharmacy.model')
const Medicine = require('../models/medicine.model')
const Pharmacy = require('../models/pharmacy.model')
const Client = require('../models/client.model')
const Order = require('../models/order.model')
const MedicineOrder = require('../models/medicine.order.model')
const {findBasket} = require("./checkout.controller");
const Vonage = require('../connections/vonage')
const NodeMailer = require('nodemailer')

function generateId() {
    return hash('_' + Date.now());
}

function groupBasketByOrders(basketEntities) {
    const orders = []
    let total = 0
    basketEntities.forEach(entity => {
        const count = entity.count
        const price = entity.medicinePharmacy.price
        const medicineEntity = entity.medicinePharmacy.medicine
        const medicine = {
            id: medicineEntity.id,
            name: medicineEntity.name,
            count: count,
            price: price * count
        }
        const pharmacyEntity = entity.medicinePharmacy.pharmacy
        const pharmacy = {
            id: pharmacyEntity.id,
            name: pharmacyEntity.name,
            address: pharmacyEntity.address,
            medicines: [medicine]
        }

        const index = orders.length - 1
        const previous = orders.length ? orders[index] : undefined
        if (previous && previous.id === pharmacy.id) {
            orders[index].medicines.push(medicine)
        } else {
            orders.push(pharmacy)
        }
        total += medicine.price
    })
    return {
        orders: orders,
        total: total
    };
}

async function updateMedicineCount(basketItem, updateCount) {
    const newCount = updateCount(basketItem.count)
    const whereClause = {
        where: {
            id: basketItem.id,
            medicinePharmacyId: basketItem.medicinePharmacyId
        }
    }
    if (newCount) {
        await Basket.update({count: newCount}, whereClause);
    } else {
        await Basket.destroy(whereClause)
    }

}

async function addNewMedicineToBasket(id, medicineId, pharmacyId) {
    const medicinePharmacy = await MedicinePharmacy.findOne({
        where: {
            medicineId: medicineId,
            pharmacyId: pharmacyId
        }
    })
    if (medicinePharmacy) {
        await Basket.create({
            id: id,
            medicinePharmacyId: medicinePharmacy.id,
            count: 1
        })
    } else {
        throw new BadRequestError(`Pharmacy with id ${pharmacyId} doesn't sell medicine with id ${medicineId}`)
    }
}

async function findMedicineInBasket(id, medicineId, pharmacyId) {
    return await Basket.findOne({
        where: {id: id},
        include: [{
            model: MedicinePharmacy,
            required: true,
            as: 'medicinePharmacy',
            where: {
                medicineId: medicineId,
                pharmacyId: pharmacyId
            }
        }]
    });
}

async function findOrCreateClient(phone, email) {
    const [client, created] = await Client.findOrCreate({
        where: {phone: phone},
        defaults: {email: email}
    })
    if (!created) {
        throw new BadRequestError(`Client with phone ${phone} and email ${email} can not be created`)
    }
    return client;
}

module.exports = {
    findBasket: async (id) => {
        if (!id) {
            return {}
        }
        const basketEntities = await Basket.findAll({
            where: {id: id},
            include: [{
                model: MedicinePharmacy,
                as: 'medicinePharmacy',
                required: true,
                include: [Medicine, Pharmacy]
            }]
        });

        if (!basketEntities.length) {
            return {}
        }

        const basket = groupBasketByOrders(basketEntities);
        return {
            id: id,
            price: basket.total,
            orders: basket.orders
        }
    },
    addToBasket: async (basketId, medicineId, pharmacyId) => {
        const id = basketId ? basketId : generateId()
        const basketItem = await findMedicineInBasket(id, medicineId, pharmacyId)
        if (basketItem) {
            await updateMedicineCount(basketItem, count => count + 1);
        } else {
            await addNewMedicineToBasket(id, medicineId, pharmacyId);
        }

        return await findBasket(id)
    },
    removeFromBasket: async (id, medicineId, pharmacyId) => {
        if (!id) {
            return {}
        }
        const basketItem = await findMedicineInBasket(id, medicineId, pharmacyId)
        if (basketItem) {
            await updateMedicineCount(basketItem, count => count - 1);
        }

        return await findBasket(id)
    },
    deleteFromBasket: async (id, medicineId, pharmacyId) => {
        if (!id) {
            return {}
        }
        const basketItem = await findMedicineInBasket(id, medicineId, pharmacyId)
        if (basketItem) {
            await updateMedicineCount(basketItem, count => 0);
        }

        return await findBasket(id)
    },
    checkout: async (basketId, phone, email) => {
        if (!basketId) {
            throw new BadRequestError('Invalid basket id')
        }
        if (!phone) {
            throw new BadRequestError('Phone must not be empty')
        }
        const basket = await findBasket(basketId)
        if (!basket) {
            throw new BadRequestError('Basket is empty')
        }

        //TODO: create client if not exist
        const client = findOrCreateClient(phone, email)

        //TODO: create order for each pharmacy for client
        const rawOrders = basket.orders.map(order => {
            return {
                pharmacyId: order.pharmacyId,
                clientId: client.id
            }
        })
        const orders = await Order.bulkCreate(rawOrders, {returning: true})

        const medicines = []
        for (let [index, order] of basket.orders.entries()) {
            order.medicines.forEach(medicine => {
                medicines.push({
                    orderId: orders[index].id,
                    medicineId: medicine.id,
                    count: medicine.count
                })
            })
        }

        await MedicineOrder.bulkCreate(medicines)

        //return all orders
        const receipt = {
            orders: basket.orders
        }
        for (let [index, order] of receipt.orders.entries()) {
            order.orderId = orders[index].id
        }

        Vonage.sendSms(phone, 'Ваше замовлення')
        //TODO: send email

        await Basket.destroy({where: {id: basketId}})

        return receipt
    }
}