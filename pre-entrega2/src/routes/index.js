const cartsapi = require('../carts/controller.api.carts')
const cartsviews = require('../carts/controller.carts')
const products = require('../products/controller.api.products')
const viewsRouter = require('../routes/views.router')
const realTime = require('../routes/realtime.router')

const routes = (app) => {
    app.use('/api/products', products)
    app.use('/api/carts', cartsapi)
    app.use('/carts', cartsviews)
    /////Entregable 26/01
    app.use('/', viewsRouter)
    app.use('/realtimeproducts', realTime)
}

module.exports = routes