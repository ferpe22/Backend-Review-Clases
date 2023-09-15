const { Router }= require('express')

const viewsRouter = Router()

viewsRouter.get('/home', (req, res) => {
    const params = {
        title: 'Home',
        nombre: 'Fer',
        style: 'home.css'
    }
    return res.render('index', params)
})

const users = [
    {
        name: "Rocio",
        lastname: "Ponce",
        age: 38,
        email: "ro_ponce@yahoo.com",
        phone: "111111111",
        role: "admin"
    },
    {
        name: "Silvana",
        lastname: "Pereira",
        age: 48,
        email: "kuky@yahoo.com",
        phone: "222222222",
        role: "user"
    },
    {
        name: "Franco",
        lastname: "Siciliano",
        age: 15,
        email: "fran@gmail.com",
        phone: "333333333",
        role: "admin"
    },
    {
        name: "Martin",
        lastname: "Ponce",
        age: 46,
        email: "mp_13@gmail.com",
        phone: "444444444",
        role: "user"
    },
    {
        name: "Fernando",
        lastname: "Pereira",
        age: 39,
        email: "fp22@gmail.com",
        phone: "555555555",
        role: "admin"
    }
]

const food = [
    {
        name: 'Hamburguesa',
        price: 100
    },
    {
        name: 'Tacos',
        price: 40
    },
    {
        name: 'Coca-Cola',
        price: 10
    },
    {
        name: 'Agua',
        price: 6
    },
    {
        name: 'Papas',
        price: 20
    }
]

viewsRouter.get('/user', (req, res) => {
    //const numAleatorio = req.query.index
    const numAleatorio = Math.floor(Math.random() * 5)

    const user = users[numAleatorio]

    const params = {
        title: "User",
        name: user.name,
        lastname: user.lastname,
        age: user.age,
        email: user.email,
        phone: user.phone,
        food,
        isAdmin: user.role == "admin",
        style: 'user.css'
    }

    return res.render('user', params)
})

viewsRouter.get('/pets', (req, res) => {
    return res.render('register')
})

module.exports = viewsRouter