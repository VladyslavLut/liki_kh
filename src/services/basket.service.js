const express = require("express")
const hash = require('string-hash-64')

function generateId() {
    return hash('_' + Date.now());
}

module.exports = {
    get: async (request, response) => {
        const body = request.body
        const id = body.id ? body.id : generateId(); //todo: move to controller

        const medicines = {}

        medicines[{
            id: 1,
            name: 'Pharmacy name',
            address: 'address',
            price: 1000
        }] = [
            {
                id: 1,
                name: 'medicine name',
                price: 10000,
                count: 2
            },
            {
                id: 2,
                name: 'medicine name 2',
                price: 5000,
                count: 1
            }
        ]

        const price = 10000

        const responseBody = {
            basket: {
                id: id,
                price: price,
                medicines: medicines
            }
        }

        return response.status(200).json(responseBody)
    },
    add: async (request, response) => {
        const body = request.body
        const id = body.id ? body.id : generateId(); //todo: move to controller
        const medicineId = body.medicineId
        const pharmacyId = body.pharmacyId

        const medicines = {}

        medicines[{
            id: 1,
            name: 'Pharmacy name',
            address: 'address',
            price: 1000
        }] = [
            {
                id: 1,
                name: 'medicine name',
                price: 10000,
                count: 2
            },
            {
                id: 2,
                name: 'medicine name 2',
                price: 5000,
                count: 1
            }
        ]

        const price = 10000

        const responseBody = {
            basket: {
                id: id,
                price: price,
                medicines: medicines
            }
        }

        return response.status(200).json(responseBody)
    },
    remove: async (request, response) => {
        const body = request.body
        const id = body.id
        const medicineId = body.medicineId
        const pharmacyId = body.pharmacyId

        const basket = {}
        return response.status(200).json({basket: basket})
    },
    delete: async (request, response) => {
        const body = request.body
        const id = body.id
        const medicineId = body.medicineId
        const pharmacyId = body.pharmacyId

        const basket = {}
        return response.status(200).json({basket: basket})
    },
    checkout: async (request, response) => {
        const body = request.body
        const basketId = body.id
        const phone = body.phone
        const email = body.email

        //TODO: clear basket
        //TODO: send email
        //TODO: send sms

        const medicines = {}

        medicines[{
            id: 1,
            name: 'Pharmacy name',
            address: 'address',
            price: 1000
        }] = [
            {
                id: 1,
                name: 'medicine name',
                price: 10000,
                count: 2
            },
            {
                id: 2,
                name: 'medicine name 2',
                price: 5000,
                count: 1
            }
        ]
        const orderNumber = 1
        const totalPrice = 1000

        const responseBody = {
            receipt: {
                orderNumber: orderNumber,
                price: totalPrice,
                medicines: medicines
            }
        }

        return response.status(200).json(responseBody)
    }
}