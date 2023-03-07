const { Router } = require('express');
const router = Router();

//const Products = require('../dao/models/class.products');
//const products = new Products();

const ProductsModel = require('../dao/models/products.models')

router.get('/', async (req, res) => {    
    //Recupero request
    let limit = req.query.limit;
    let page = req.query.page;
    let query = req.query.query;
    let sort = req.query.sort;

    if(!limit)
        limit = 10
    if(!page)
        page = 1
    if(!query)
        query = {}
    if(sort == 'asc')
        sort = { price: 'asc' }
    else if (sort == 'desc') 
        sort = { price: 'desc' }

    let options = {
        page: page, 
        limit: limit, 
        sort: sort
    }

    try {
        const products = await ProductsModel.paginate(query,options)
        
        let prevLink = null
        if(products.hasPrevPage)
            prevLink = 'armar link previo'
        let nextLink = null
        if(products.hasNextPage)
            nextLink = 'armar link siguiente'
        
        res.json({ 
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            page: products.page,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink
         })

    } catch(error) {

    }



    //Manejado con archivos FS
    // products.getProducts().then((data) => {
    //     if (!limit)
    //         limit = data.length;
    //     data = data.slice(0, limit);

    //     console.log(data);
    //     res.send(data);
    // }
    // )
})

router.get('/:pid', async (req, res) => {

    let pid = req.params.pid;
    try {
        const products = await ProductsModel.findById(pid)
        res.json({ message: products})
        // res.send('llego hasta products api')

    } catch(error) {

    }

    //Manejado con archivos FS
    // //Recupero request
    // let pid = req.params.pid;

    // products.getProductById(pid).then((product) => {
    //     console.log(product)
    //     res.send(product)
    // })
})

router.post('/', async (req, res) => {
    const title = req.query.title;
    const description = req.query.description;
    const code = req.query.code;
    const price = req.query.price;
    const stock = req.query.stock;
    const category = req.query.category;
    const thumbnail = req.query.thumbnail;

    if (!title || !description || !code || !price || !stock || !category || !thumbnail)
        return null

    const newProduct = {
        title: title,
        description: description,
        code: code,
        price: price,
        stock: stock,
        category: category,
        status: true,
        thumbnail: ''
    }

    try {
        await ProductsModel.create(newProduct)
        res.json('Product created')
    } catch (error) {
        
    }

    //Manejado con archivos FS
    // products.addProduct(newProduct).then((result) => {
    //     if(!result)
    //         res.status(400).json({error: 'Missing data'}) 
    //     else
    //         res.send(result)
    // })
});

//Actualiza el producto con id = pid
router.put('/:pid', async (req,res)=>{

    //TODO falta hacer el actualizar con Mongoose.
    let pid = req.params.pid;
    const filter = { id: pid };

    try {
        const toDelete = await ProductsModel.findById(pid)

        if (req.query.title)
            toDelete.title = req.query.title
        if (req.query.description)
            toDelete.description = req.query.description
        if (req.query.code)
            toDelete.code = req.query.code
        if (req.query.price)
            toDelete.price = req.query.price
        if (req.query.stock)
            toDelete.stock = req.query.stock
        if (req.query.category)
            toDelete.category = req.query.category
        if (req.query.thumbnail)
            toDelete.thumbnail = req.query.thumbnail

        await ProductsModel.deleteOne(filter)
        await ProductsModel.create(toDelete)


        res.json('Updated')

    } catch(error) {

    }

    //Manejado con archivos FS
    // products.updateProduct(req).then((result) => {
    //     console.log(result);
    // })
});

//Elimina el producto con id = pid
router.delete('/:pid', async (req,res)=>{

    let pid = req.params.pid;
    const filter = { _id: pid };

    try {
        await ProductsModel.deleteOne(filter)
        res.json('Product deleted')
    } catch (error) {
        
    }

    //Manejado con archivos FS
    // products.deleteProductById(req.params.pid).then((result) => {
    //     if(result)
    //         res.send({message: 'Success'})
    //     else
    //         res.status(400).json({error: 'Error while deleting'}) 
    // })
});


module.exports = router