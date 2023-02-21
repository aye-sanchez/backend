const { Router } = require('express')
const router = Router()
const Products = require('../dao/models/class.products');
const products = new Products();

router.get('/', (req, res) => {
    //Recupero request
    let limit = req.query.limit;

    products.getProducts().then((data) => {
        if (!limit)
            limit = data.length;
        data = data.slice(0, limit);

       // console.log(data);
        const result = {
            products : JSON.stringify(data)
        }
        res.render('index', result);
    }
    )
})


module.exports = router