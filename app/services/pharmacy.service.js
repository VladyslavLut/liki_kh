const express = require("express")

module.exports = {
    search: (request, response) => {
        console.log(request.query)
        const query = request.query.q //TODO: or default
        const medicineId = request.params.medicineId
        //todo: get all pharmacies that have this medicine
        const pharmacies = [
            {name: query, address: 'address'},
            {name: 'pharmacy2', address: 'address'}
        ]

        return response.status(200).json({
            pharmacies: pharmacies
        })
    }
}