const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

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

productsSchema.plugin(mongoosePaginate)
const Products = mongoose.model(productsCollection, productsSchema)

module.exports = Products