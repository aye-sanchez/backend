const socket = io()


socket.emit('realtimeproducts', 'traeme los productos')

socket.on('obtainProducts', data => {
    console.log(data)
})