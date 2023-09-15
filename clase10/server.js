const express = require('express')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io') // tambien se puede escribir => const Server = require('socket.io).Server

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('public'))

const PORT = 8080

const httpServer = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))

const socketServer = new Server(httpServer)

//Funcion de conexion. Instruccion de qué hacer cuando un nuevo cliente 'socket' se conecte
socketServer.on('connection', (socket) => { //cuando alguien se conecte (haya una connection), se da la instruccion de qué se debe acer mediante una funcion callback. (socket) se refiere al socket/cliente que se va a conecta a nuestro servidor
    console.log('Nuevo cliente conectado!')

    socket.on('mi_mensaje', (data) => {
        console.log(data)
    })
//los mensajes so asincronos, lo podes mandar al toque o setearle un SetTimeout para retardar el mensaje
    setTimeout(() => {
        socket.emit('mensaje_backend', 'Mensaje enviado desde el backend')
    }, 3000)

    //socket.emit('mensaje_backend', 'Mensaje enviado desde el backend')
})

app.get('/', (req, res) => {
    return res.json({
        status: 'running',
        date: new Date()
    })
})

const products = [
    {
        id: 1,
        name: 'Coca-cola',
        price: 10
    },
    {
        id: 2,
        name: 'Cafe',
        price: 20
    },
    {
        id: 3,
        name: 'Hamburguesa',
        price: 30
    },
    {
        id: 4,
        name: 'Tacos',
        price: 12
    }
]

app.get('/websockets', (req, res) => {
    return res.render('websockets')
})

app.get('/products', (req, res) => {
    const params = {
        title: 'Productos',
        products //podria ser tb products = products, pero como la vaiable se llama igual a la llave, se puede soo poner products
    }
    return res.render('products', params)
})

app.get('/api/products', (req, res) => {
    return res.json(products)
})

app.post('/api/products', (req, res) => {
    const product = req.body
    product.id = products.length + 1

    products.push(product)

    socketServer.emit('nuevoProducto', JSON.stringify(product))

    return res.status(201).json(product)
})

