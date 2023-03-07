import * as fs from 'fs';

export default class ProductManager {
  constructor(filename) {
    this.products = [];
    this.filename = filename;

    this.products = JSON.stringify(this.products, null, 2);

    const operacionesAsincronicas = async () => {
      await fs.promises.writeFile(this.filename, this.products);
    };

    operacionesAsincronicas();
  }

  addProducts = (title, description, price, thumbnail, code, stock) => {
    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    //definición de función asincronica, que maneja las operaciones de los archivos
    const operacionesAsincronicas = async () => {
      let products = await fs.promises.readFile(this.filename, "utf-8"); //lee el archivo
      products = JSON.parse(products); // transformo el JSON a objeto

      //verificar cantidad de elementos para calcular el ID del nuevo producto
      if (products.length === 0) {
        newProduct.id = 1;
      } else {
        newProduct.id = products[products.length - 1].id + 1;
      }

      //EXTRA verificar que el codigo no se duplique

      products.push(newProduct); //con push agrego un objeto al array; entonces tengo un arreglo de objeto con el objeto nuevo

      products = JSON.stringify(products, null, 2); // para persistirlo tengo que pasar de objeto a JSON JSON.stringify(info, null, 2) para preservar el formato de representación del objeto en el archivo (2 representa en este caso la cantidad de espacios de indentación usadas al representar el objeto como string)

      await fs.promises.writeFile(this.filename, products); // escribo el archivo

      //await fs.promises.appendFile('./products.txt', ''); //modifico el archivo, o sea agrego el producto
    };

    operacionesAsincronicas();
  };

  async getProducts() {
    let products = await fs.promises.readFile(this.filename, "utf-8");
    products = JSON.parse(products);
    return products;
  }

  async getProductsById(id) {
    const products = await this.getProducts();

    const obj = products.find((obj) => obj.id === id);
    return obj ? obj : null;
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