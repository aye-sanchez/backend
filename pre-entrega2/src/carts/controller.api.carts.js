const { Router } = require('express');

const router = Router();

// const Carts = require('../dao/models/class.carts');
// const carts = new Carts();

const CartsModel = require('../dao/models/carts.models')

router.get('/:cid', async (req, res) => {

    let cid = req.params.cid;

    if (!cid)
        res.status(400).json({ error: 'Cart not found' })
    try {
        const cartFound = await CartsModel.findById(cid)
        res.json({message:  cartFound })
    } catch (error) {
        
    }

    //Manejado con FS
    // carts.getProductsByCid(req.params.cid).then((result) => {
    //     if (result)
    //         res.send(result)
    //     else res.status(400).json({ error: 'Cart not found' })
    // })
});

router.post('/', async (req, res) => {

    const newCart = {
        products: []
    }

    try {
        await CartsModel.create(newCart)
        res.json({ message: 'Cart created'})
    } catch(error) {

    }


    //Manejado con FS
    // carts.addCart().then((result) => {
    //     console.log(result)
    //     if (result)
    //         res.send(result)
    //     else
    //         res.status(500).json({ error: 'Server error' })
    // });
});

router.post('/:cid/product/:pid', async (req, res) => {
    
    let cid = req.params.cid;
    let pid = req.params.pid;

    const filter = { _id: cid };

    if (!cid || !pid)
        res.status(400).json({ error: 'Missing fields' })
    try {
        const cartFound = await CartsModel.findById(cid)
        const newProducts = cartFound.products
        newProducts.push(pid)
        const update = { products: newProducts }

        await CartsModel.findOneAndUpdate(filter, update) 
        res.json({message: `Product ${pid} added in ${cid}`})     

    } catch (error) {
        
    }
});

module.exports = router