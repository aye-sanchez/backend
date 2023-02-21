const mongoose = require('mongoose')

const productsCollection = 'products'

const productsSchema = mongoose.Schema({

    title: String,
    description: String,
    code: String,
    price: Number,
    stock: Number,
    category: String,
    thumbnail: String,
    status: Boolean

})

const Products = mongoose.model(productsCollection, productsSchema)

module.exports = Products