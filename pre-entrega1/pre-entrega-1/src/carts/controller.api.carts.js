const { Router } = require('express');
const Carts = require('./class.carts');
const router = Router();
const carts = new Carts();

//let users = [];


router.get('/:cid', (req, res) => {
    if (!req.params.cid)
        res.status(400).json({ error: 'Cart not found' })

    carts.getProductsByCid(req.params.cid).then((result) => {
        if (result)
            res.send(result)
        else res.status(400).json({ error: 'Cart not found' })
    })
});

router.post('/', (req, res) => {
    carts.addCart().then((result) => {
        console.log(result)
        if (result)
            res.send(result)
        else
            res.status(500).json({ error: 'Server error' })
    });
});

router.post('/:cid/product/:pid', (req, res) => {
    //primero, debo obtener el cart en base al cid
    carts.addProduct(req.params.cid, req.params.pid)




});

module.exports = router