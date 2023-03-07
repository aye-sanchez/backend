const mongoose = require('mongoose')

const cartsCollection = 'carts'

const cartsSchema = mongoose.Schema({
    //TODO revisar como hacer el populate
    //products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
    products: [],

})

const Carts = mongoose.model(cartsCollection, cartsSchema)

module.exports = Carts