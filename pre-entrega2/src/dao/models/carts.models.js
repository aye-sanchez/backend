const mongoose = require('mongoose')

const cartsCollection = 'carts'

const cartsSchema = mongoose.Schema({

    products: [],

})

const Carts = mongoose.model(cartsCollection, cartsSchema)

module.exports = Carts