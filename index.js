const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const middlewares = require('middlewares')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

require('src/database/connection')

const catalog = require('./src/routes/catalog')
app.use('/catalog', catalog)

const basket = require('./src/routes/basket')
app.use('/basket', basket)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app