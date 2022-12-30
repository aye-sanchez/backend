//Declaración de una clase
class ProductManager {

constructor () {
    this.products = [];
}

//Crear los metodos
getProducts = () => {
    console.log(this.products)
    return this.products;
}

addProducts = (title, description, price, thumbnail, code, stock) => {
    const newProduct = {
        title,  
        description,
        price,
        thumbnail,
        code,
        stock
    }
    if (this.products.length === 0) {
        newProduct.id = 1;
    }
    else{
        newProduct.id = this.products[this.products.length-1].id + 1;
    }
    for(const producto of this.products) {
        if (producto.code == code) {
            console.log("Error producto con codigo ya existe")
           return
        }
    }

    this.products.push(newProduct)

}

getProductById = (idbuscado) => {
if (idbuscado > 0 && idbuscado <= (this.products.length))
{
    let productFound = this.products[idbuscado-1]
    console.log("Encontrado")
    console.log(productFound)
    return(productFound)
} else {
    console.log('Producto no existe: '+idbuscado)
}
}
}


pm = new ProductManager()
pm.getProducts()
pm.addProducts("producto prueba", "este es un producto prueba", "200", "sin imagen", "abc123",25)
pm.getProducts()
pm.addProducts("producto prueba", "este es un producto prueba", "200", "sin imagen", "abc123",25)

pm.getProductById(1)
pm.getProductById(2)
pm.getProductById(5)