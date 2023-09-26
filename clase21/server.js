const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const passport = require('passport')

const InitializePassport = require('./config/passport.config')
const viewsRouter = require('./routers/viewsRouter')
const sessionRouter = require('./routers/sessionRouter')

const MONGODB_CONNECT = 'mongodb+srv://ferpereira22:franco15@cluster0.1l8kmh9.mongodb.net/clase21?retryWrites=true&w=majority'
mongoose.connect(MONGODB_CONNECT)
    .then(async => {
        console.log('conectado a la base de datos')
    })

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser('secretkey'))


app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGODB_CONNCECT,
        ttl: 120
    }),    
    secret: 'secretSession',
    resave: true,
    saveUninitialized: true
}))

InitializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    return res.json({
        status: 'running',
        date: new Date()
    })
})

app.use('/api/sessions', sessionRouter)
app.use ('/', viewsRouter)

const PORT = 8080
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))