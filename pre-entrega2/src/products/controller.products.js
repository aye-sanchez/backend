const { Router } = require('express');
// const Products = require('../dao/models/products.models');
const router = Router();
const ProductsDB = require('../dao/models/products.models')

//const Products = require('./class.products');
//const products = new Products();

router.get('/', async (req, res) => {
    //Recupero request
    let limit = req.query.limit;
    let page = req.query.page;
    let query = req.query.query;
    let sort = req.query.sort;

    if(!limit)
        limit = 10
    

    try {
        const products = await ProductsDB.paginate({limit: limit})
        res.json(products)
    } catch (error) {
        
    }
    



    // products.getProducts().then((data) => {
    //     if (!limit)
    //         limit = data.length;
    //     data = data.slice(0, limit);

    //     console.log(data);
    //     res.send(data);
    // }
    // )
})

router.get('/:pid', (req, res) => {

    //Recupero request
    let pid = req.params.pid;

    products.getProductById(pid).then((product) => {
        console.log(product)
        res.send(product)
    })
})

router.post('/', (req, res) => {
    const title = req.query.title;
    const description = req.query.description;
    const code = req.query.code;
    const price = req.query.price;
    const stock = req.query.stock;
    const category = req.query.category;
    const id = uuidv4();
    const thumbnail = req.query.thumbnail;

    if (!title || !description || !code || !price || !stock || !category || !thumbnail)
        return null

    const newProduct = {
        id: id,
        title: title,
        description: description,
        code: code,
        price: price,
        stock: stock,
        category: category,
        status: true,
        thumbnail: ''
    }
    products.addProduct(newProduct).then((result) => {
        if(!result)
            res.status(400).json({error: 'Missing data'}) 
        else
            res.send(result)
    })
});

//Actualiza el producto con id = pid
router.put('/:pid', (req,res)=>{
    products.updateProduct(req).then((result) => {
        console.log(result);
    })
});

//Elimina el producto con id = pid
router.delete('/:pid', (req,res)=>{
    products.deleteProductById(req.params.pid).then((result) => {
        if(result)
            res.send({message: 'Success'})
        else
            res.status(400).json({error: 'Error while deleting'}) 
    })
});


module.exports = router