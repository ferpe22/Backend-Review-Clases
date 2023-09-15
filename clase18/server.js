const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const handlebars = require('express-handlebars');
const e = require('express');

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(cookieParser('secretkey'));
app.use(session({
    secret: 'secretkey',
    resave: true,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    return res.json({
        status: 'running',
        date: new Date()

    })
})

app.get('/setCookie', (req, res) => {
    return res.cookie('CoderCookie', 'Valor de la cookie', { maxAge:60000 }).send('Cookie')
})

app.get('/getCookie', (req, res) => {
    return res.send({
        cookies: req.cookies,
        signedCookies: req.signedCookies
    })
})

app.get('/deleteCookie', (req, res) => {
    return res.clearCookie('CoderCookie').send('Cookie removed')
})

app.get('/signedCookie', (req, res) => {
    return res.cookie('SignedCoderCookie', 'Esta es una cookie firmada', { signed: true }).send('Cookie')
})

app.get('/cookiesForm', (req, res) => {
    return res.render('cookies')
})

app.post('/cookiesForm', (req, res) => {
    return res.cookie('user', req.body, { maxAge: 10000 }).redirect('/cookiesForm')
})

app.get('/session', (req, res) => {
    //return res.json(req.session)

    if(!req.session.counter){
        req.session.counter = 1
        req.session.name = req.query.name

        return res.json(`Bienvenido ${req.session.name}`)
    } else{
        req.session.counter++

        return res.json(`${req.session.name} has visitado la página ${req.session.counter} veces`)
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) {
            return res.send('Logout ok')
        }

        return res.status(500).json({ error: err })
    })
})

const users = [
    {
        usename: 'iram',
        password: 'qwerty',
        admin: true
    },
    {
        usename: 'rocio',
        password: 'santorini',
        admin: false
    }
]

app.get('/login', (req, res) => {
    const { username, password } = req.query

    const user = users.find(user => user.usename === username && user.password === password)

    if(!user) {
        return res.status(401).json({
            error: 'Usuario o contraseña incorrectos'
        })
    }

    req.session.username = user.usename
    req.session.admin = user.admin

    return res.json({ user })
})

const authMiddleware = (req, res, next) => {
    if(!req.session.username) {
        return res.status(401).send('Necesitas iniciar sesion para ver esta pagina')
    }

    return next()
}

app.get('/auth', authMiddleware, (req, res) => {
    return res.send(`Si puedes ver esta ruta es por que estas autenticado. Bienvenido ${req.session.username}`)
})

const adminMiddleware = (req, res, next) => {
    if(!req.session.admin) {
        return res.status(401).send('Necesitas ser administrador para ver esta pagina')
    }

    return next()
}

app.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
    return res.send(`Si puedes ver esta ruta es por que eres administrador. Bienvenido ${req.session.username}` )
})

//Caso practico final de clase.
app.get('/root', (req, res) => {

    if(!req.session.counter){
        req.session.counter = 1
        req.session.user = req.query.username

        return res.send(`Te damos la Bienvenida ${req.session.user}`)
    } else {
        req.session.counter++
        return res.send(`${req.session.user} ha visitado este sitio ${req.session.counter} veces`)
    }
})

const PORT = 8080
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))