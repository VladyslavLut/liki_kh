const express = require('express')
const router = express.Router()

const basketService = require('../services/basket.service');

router.get('/', basketService.get)
router.post('/add', basketService.add)
router.post('/remove', basketService.remove)
router.post('/delete', basketService.delete)
router.post('/checkout', basketService.checkout)

module.exports = router