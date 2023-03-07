const { Router } = require("express");

const router = Router();

// const Carts = require('../dao/models/class.carts');
// const carts = new Carts();

const CartsModel = require("../dao/models/carts.models");

//Busca carrito
//TODO populate de todos los id
router.get("/:cid", async (req, res) => {
  let cid = req.params.cid;

  if (!cid) res.status(400).json({ error: "Cart not found" });
  try {
    const cartFound = await CartsModel.findById(cid);
    res.json({ message: cartFound });
  } catch (error) {}

  //Manejado con FS
  // carts.getProductsByCid(req.params.cid).then((result) => {
  //     if (result)
  //         res.send(result)
  //     else res.status(400).json({ error: 'Cart not found' })
  // })
});

//Crea carrito vacio
//Done
router.post("/", async (req, res) => {
  const newCart = {
    products: [],
  };

  try {
    await CartsModel.create(newCart);
    res.json({ message: "Cart created" });
  } catch (error) {}

  //Manejado con FS
  // carts.addCart().then((result) => {
  //     console.log(result)
  //     if (result)
  //         res.send(result)
  //     else
  //         res.status(500).json({ error: 'Server error' })
  // });
});

//Agrega producto en carrito
//Done
router.post("/:cid/product/:pid", async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;

  const filter = { _id: cid };

  if (!cid || !pid) res.status(400).json({ error: "Missing fields" });
  try {
    const cartFound = await CartsModel.findById(cid);
    const newProducts = cartFound.products;
    newProducts.push(pid);
    const update = { products: newProducts };

    await CartsModel.findOneAndUpdate(filter, update);
    res.json({ message: `Product ${pid} added in ${cid}` });
  } catch (error) {}
});

//deberá eliminar del carrito el producto seleccionado.
//Done
router.delete("/:cid/products/:pid", async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;

    const filter = { _id: cid };
    
    try {
        const cartFound = await CartsModel.findById(cid);
        const newProducts = cartFound.products.filter((obj) => obj != pid);   
        const update = { products: newProducts };    

        await CartsModel.findOneAndUpdate(filter, update);  


        res.json({ message: 'product deleted from cart'})
    } catch (error) {
        
    }


});

//PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de 
//ejemplares del producto por cualquier cantidad pasada desde req.body
//TODO
router.put("/:cid/products/:pid", async (req, res) => {

    // if(!req.body)

});

//DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
//Done
router.delete('/:cid', async (req,res) => {
    let cid = req.params.cid;

    const filter = { _id: cid };
    const update = { products: [] };
    try {
        await CartsModel.findOneAndUpdate(filter, update);        
    } catch (error) {
        
    }
})



//TODO Preguntar kesesto
//PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba ??????
router.put("/:cid/", async (req, res) => {});

module.exports = router;
