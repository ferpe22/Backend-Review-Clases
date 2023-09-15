const express = require('express')
const productsRouter = require('./routers/productsRouter')
const viewsRouter = require('./routers/viewsRouter')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')


const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


const MONGODB_CONNECT = 'mongodb+srv://iramgutzglez:PolaeoVvneDNjYWL@cluster0.pzs2exz.mongodb.net/43375-clase15?retryWrites=true&w=majority'
mongoose.connect(MONGODB_CONNECT)
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.log(error))


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use('/api/products', productsRouter)
app.use('/products', viewsRouter)

app.get('/', (req, res) => {
    res.json({
        status: 'runnning',
        date: new Date()
    })
})

const PORT = 8080
app.listen(PORT, () => console.log(`Server corriendo en el puerto ${PORT}`))
