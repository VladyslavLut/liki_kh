const express = require("express")
// const medicine = require("../model/medicine")

module.exports = {
    search: (request, response) => {
        const query = request.params.query;
        //TODO: receive a list of drugs from controller
        // const medicines = [
        //     new Medicine(
        //         "Medicine 1",
        //         "https://cdn.tabletki.ua/img/goods/12f7b0ef-2210-440f-9855-95b199f226e2/img_0.jpg?v=AAAAAAhZKlM",
        //         "Gedeon Richter Ltd.",
        //         [],
        //         "category"
        //     ), new Medicine(
        //         "Medicine 2",
        //         "https://cdn.tabletki.ua/img/goods/12f7b0ef-2210-440f-9855-95b199f226e2/img_0.jpg?v=AAAAAAhZKlM",
        //         "Gedeon Richter Ltd.",
        //         [],
        //         "category"
        //     )
        // ];
        return response.status(200).json({medicines: `list of medicines ${query}`});
    }
}