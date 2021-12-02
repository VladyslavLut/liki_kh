const express = require('express')
const router = express.Router()

const catalogService = require('../services/catalog.service');
const pharmacyService = require("../services/pharmacy.service");

router.get('/', catalogService.search)
router.get('/orderings', catalogService.getOrderings)
router.get('/categories', catalogService.getCategories)
router.get('/:medicineId', catalogService.getMedicine)
router.get('/:medicineId/pharmacy', pharmacyService.search)

module.exports = router