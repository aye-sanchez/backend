const socket = io()
const product_list = document.querySelector("#product_list");

socket.emit('realtimeproducts', 'traeme los productos')


socket.on('obtainProducts', (data) => {
    let nameDiv = document.getElementById('product_list')

    for(let i=0; i< data.products2.length; i = i + 1) {
        newName = document.createElement('p');
        newName.textContent = data.products2[i].title;
        nameDiv.appendChild(newName);
    }
    
})