const express = require('express')
const productsRouter = require('./routers/productsRouter')
const viewsRouter = require('./routers/viewsRouter')
const sessionRouter = require('./routers/sessionRouter')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const passport = require('passport')
const InitializePassport = require('./config/passport.config')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const session = require('express-session')

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


const MONGODB_CONNECT = 'mongodb+srv://ferpereira22:franco15@cluster0.1l8kmh9.mongodb.net/clase24_Integrador?retryWrites=true&w=majority'
mongoose.connect(MONGODB_CONNECT)
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.log(error))


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use(session({
  store: MongoStore.create({
      mongoUrl: MONGODB_CONNECT,
      ttl: 15
  }),    
  secret: 'secretSession',
  resave: true,
  saveUninitialized: true
}))

InitializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/api/products', productsRouter)
app.use('/', viewsRouter)
app.use('/api/sessions', sessionRouter)

app.get('/', (req, res) => {
    res.json({
        status: 'runnning',
        date: new Date()
    })
})

const PORT = 8080
app.listen(PORT, () => console.log(`Server corriendo en el puerto ${PORT}`))
