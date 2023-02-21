const fs = require('fs');

const path = './files/products.json';
const { v4: uuidv4 } = require('uuid');

class Products {


    getProducts = async () => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        }
        else {
            return []
        }
    }

    getProductById = async (pid) => {
        const product = await this.getProducts().then((allProducts) => {
            let obj = allProducts.find(obj => obj.id == pid);
            return obj ? obj : null;
        }
        );

        return product ? product : null;
    }

    addProduct = async (newProduct) => {


        const allProducts = await this.getProducts();

        allProducts.push(newProduct);

        try {
            await fs.promises.writeFile(path, JSON.stringify(allProducts, null, 2));
            return newProduct
        } catch (error) {
            return null
        }
    }


    deleteProductById = async (pid) => {
        const updatedProducts = await this.getProducts().then((allProducts) => {
            return allProducts.filter((obj) => obj.id != pid)
        });

        try {
            await fs.promises.writeFile(path, JSON.stringify(updatedProducts, null, 2));
            return true
        } catch (error) {
            return false
        }
    }


    //Para hacer el update
    updateProduct = async (req) => {

        //Recupero primero el producto existente
        const toDelete = await this.getProductById(req.params.pid);

        //Si no existe, devuelvo false
        if (!toDelete)
            return false

        //Si los req.param.XXXX existen, voy actualizando su valor en el objeto encontrado arriba
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


        //Ya que tengo el ID del producto, procedo a borrarlo y luego lo agrego de nuevo con la 
        //informacion actualizada

        return this.deleteProductById(toDelete.id).then((result) => {
            //Si se elimino correctamente (true)
            if (result)
                //Devuelvo el resultado de si se agrega correctamente o no (true/false)
                return this.addProduct(toDelete).then((result) => {
                    if (!result)
                        return false
                    else
                        return true
                });
            //Si no se elimino
            else
                return false
        })

    }
}

module.exports = Products