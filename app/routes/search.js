const express = require('express')
const router = express.Router()

const medicineSearchService = require("../services/medicine.search.service");

router.get("/:query", medicineSearchService.search)

module.exports = router