const { Router } = require('express');
const router = Router();

//const Carts = require('./class.carts');
//const carts = new Carts();

const CartsModel = require("../dao/models/carts.models");

router.get('/:cid', async (req, res) => {

    let cid = req.params.cid;

    if (!cid) res.status(400).json({ error: "Cart not found" });
    try {
      const cartFound = await CartsModel.findById(cid).populate();
      const result = {
        id : cid,
        products : JSON.stringify(cartFound.products)
      }

      res.render('carts',result)
    } catch (error) {}

});

// router.post('/', (req, res) => {
//     carts.addCart().then((result) => {
//         console.log(result)
//         if (result)
//             res.send(result)
//         else
//             res.status(500).json({ error: 'Server error' })
//     });
// });

// router.post('/:cid/product/:pid', (req, res) => {
//     //primero, debo obtener el cart en base al cid
//     carts.addProduct(req.params.cid, req.params.pid)




// });

module.exports = router