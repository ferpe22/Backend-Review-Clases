const socket = io()

console.log(socket)

socket.on('nuevoProducto', (data) => {
    const product = JSON.parse(data)

    const productHTML = `
    <tr>
        <td>${this.id}</td>
        <td>${this.name}</td>
        <td>${this.price}</td>
    </tr>
    `

    const table = document.getElementById('productos')

    table.append(productHTML)

})