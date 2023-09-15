const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')
const MongoStore = require('connect-mongo')

const app = express()
const fileStorage = FileStore(session)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser('secretkey'))

const MONGODB_CONNCECT = 'mongodb+srv://ferpereira22:franco15@cluster0.1l8kmh9.mongodb.net/clase19?retryWrites=true&w=majority'

app.use(session({
    /*store: new fileStorage({ 
        path:'./sessions',
        ttl: 100,
        retries: 0 }),*/
    store: MongoStore.create({
        mongoUrl: MONGODB_CONNCECT,
        ttl: 120

    }),    
    secret: 'secretSession',
    resave: true,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    return res.json({
        status: 'running',
        date: new Date()
    })
})

app.get('/session', (req, res) => {

    if(!req.session.counter) {
        req.session.counter = 1
        req.session.name = req.query.name

        return res.json(`Bienvenido ${req.session.name}`)
    } else {
        req.session.counter++

        return res.json(`${req.session.name} has visitado esta pagina ${req.session.counter} veces`)
    }
})

const PORT = 8080
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))