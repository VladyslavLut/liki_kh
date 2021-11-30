const express = require("express")

module.exports = {
    getCategories: (request, response) => {
        const categories = ['painkiller', 'temperature'] //TODO:
        return response.status(200).json({categories: categories})
    },
    search: (request, response) => {
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
    },
    getMedicine: (request, response) => {
        const id = request.params.medicineId
        const medicine = {
            id: id,
            name: 'medicine'
        }
        return response.status(200).json({medicine: medicine})
    }
}