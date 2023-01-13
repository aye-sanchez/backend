import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

app.get("/products", (req, res) => {
  res.send(pm.getProducts());
});

//debe tener un limite a la cantidad de productos
app.get("/products", (req, res) => {
  const limit = req.query.limit; //la query me sirve para hacer consultas pero filtrando con determinas caracteristicas que necestio
  res.send(products);
});

//debe devolver el producto con id=2
app.get("/products/:id", (req, res) => {
  const { id } = req.params; //params me permite identificar los recursos, o sea me trae el producto con el id indicado o en este caso avisa que el producto con el id indicado no fue encontrado.
  const product = pm.getProductById(id);
  //si el producto no se encuentra
  if (!product) {
    res.status(404).json({ error: " Producto No Encontrado" });
  }
  //si el producto se encuentra
  else {
    res.send(pm.getProductById(id));
  }
});

app.listen(8080, () => {
  //lamo al servidor 8080
  console.log("running from express");
});

let pm = new ProductManager("./products.txt");
pm.addProducts(
  //llamo al metodo addproducts
  "producto prueba",
  "este es un producto prueba",
  "200",
  "sin imagen",
  "abc123",
  "25"
);

setTimeout(async function () {
  await pm.addProducts(
    //llamo al metodo addproducts
    "mermerlada",
    "de frutilla",
    "350",
    "sin imagen",
    "fruti001",
    "6333333"
  );
}, 1000);
