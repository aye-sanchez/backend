/////////////////////////////////////////////////////////
///////////IMPORTS
////////////////////////////////////////////////////////
const fs = require("fs");
const express = require('express');

/////////////////////////////////////////////////////////
///////////CLASES
////////////////////////////////////////////////////////
class ProductManager {
  constructor(filename) {
    this.products = [];
    this.filename = filename;

    this.products = JSON.stringify(this.products, null, 2);

    const inicializar = async () => {
      //Implementar que si existe no lo borre
      await fs.promises.open(this.filename)
      //await fs.promises.writeFile(this.filename, this.products); //Escribe, si existe lo deja en blanco
    };

    inicializar();
  }

  addProducts(title, description, price, thumbnail, code, stock) {

    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    const readWrite = async () => {
      let products = await fs.promises.readFile(this.filename, "utf-8"); //lee el archivo
      products = JSON.parse(products); // transformo el JSON a objeto

      //verificar cantidad de elementos para calcular el ID del nuevo producto
      if (products.length === 0) {
        newProduct.id = 1;
      } else {
        newProduct.id = products[products.length - 1].id + 1;
      }

      products.push(newProduct); //con push agrego un objeto al array; entonces tengo un arreglo de objeto con el objeto nuevo

      products = JSON.stringify(products, null, 2); // para persistirlo tengo que pasar de objeto a JSON JSON.stringify(info, null, 2) para preservar el formato de representación del objeto en el archivo (2 representa en este caso la cantidad de espacios de indentación usadas al representar el objeto como string)

      await fs.promises.writeFile(this.filename, products); // escribo el archivo
    }


    readWrite();
  }

  async getProducts() {
    let products = await fs.promises.readFile(this.filename, "utf-8");
    products = JSON.parse(products);
    return products;
  }

  async getProductById(pid) {

    const product = await this.getProducts().then((allProducts) => {
      let obj = allProducts.find(obj => obj.id == pid);
      return obj ? obj : null;
    }
    );

    return product ? product : null;
  }

  async updateProductById(id, key, value) {
    const products = await this.getProducts();

    const product = products.find((product) => product.id === id);
    product[key] = value;

    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(products, null, 2)
    );
  }

  async deleteById(id) {
    let products = await this.getProducts();

    products = products.filter((obj) => obj.id != id);
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(products, null, 2)
    );

    console.log(products);
  }
}



/////////////////////////////////////////////////////////
///////////CONSTANTES
////////////////////////////////////////////////////////
const pm = new ProductManager('products.txt');


/////////////////////////////////////////////////////////
///////////SERVIDOR EXPRESS
////////////////////////////////////////////////////////
const app = express();
app.listen(8080, () => console.log('Up and running in port 8080'));
app.use(express.urlencoded({ extended: true }))



/////////////////////////////////////////////////////////
///////////ENDPOINTS
////////////////////////////////////////////////////////
app.get('/products', (req, res) => {

  //Recupero request
  let limit = req.query.limit;

  pm.getProducts().then((productos) => {
    if (!limit)
      limit = productos.length;
    productos = productos.slice(0, limit);

    console.log(productos);
    res.send(productos);
  }
  )
})

app.get('/products/:pid', (req, res) => {

  //Recupero request
  let pid = req.params.pid;

  pm.getProductById(pid).then((product) => {
    console.log(product)
    res.send(product)
  })
})

