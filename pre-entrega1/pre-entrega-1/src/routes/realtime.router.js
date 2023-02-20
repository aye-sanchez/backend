const { Router } = require('express')
const router = Router()
const Products = require('../products/class.products');
const products = new Products();
const { io } = require('socket.io-client')
const socket = io()


router.get('/', (req, res) => {
    //Recupero request
    // let limit = req.query.limit;

    // products.getProducts().then((data) => {
    //     if (!limit)
    //         limit = data.length;
    //     data = data.slice(0, limit);

    //    // console.log(data);
    //     const result = {
    //         products : JSON.stringify(data)
    //     }
    //     res.render('realtimeproducts', result);
    // }
    // )  
    // socket.emit('realtimeproducts', 'traeme los productos')
    // console.log('aca estoy1')
    // socket.on("obtainProducts", product => {
    //     console.log('aca estoy')
    //     res.render('realtimeproducts', product)
    // })
    res.render('realtimeproducts')
})

module.exports = router