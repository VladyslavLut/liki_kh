const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const catalog = require('./app/routes/catalog')
app.use('/catalog', catalog)

// const medicine = require('./app/routes/medicine')
// app.use('/medicine', medicine)

// const pharmacy = require('./app/routes/pharmacy')
// app.use('/pharmacy', pharmacy)

// const basket = require('./app/routes/basket')
// app.use('/basket', basket)

// const order = require('./app/routes/order')
// app.use('/order', order)


module.exports = app