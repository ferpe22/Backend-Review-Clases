
const express = require('express')

const app = express()

const template =  `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home</title>
    </head>
    <body>
        <h1 style="color: blue;">Bienvenidos a la pagina</h1>
    </body>
    </html>`

app.get('/', (req, res) => {
    return res.send(template)
})

app.get('/contacto', (req, res) => {
    return res.send('Bienvenido a la pagina de Contacto')
})

app.get('/sucursales', (req, res) => {
    return res.send('Bienvenido a la pagina de Sucursales')
})

app.get('/proveedores', (req, res) => {
    return res.send('Bienvenido a la pagina de Proveedores')
})

app.get('/saludo/:name', (req, res) => {
    return res.send(`Hola ${req.params.name}`)
})

const users = [
    {
        id: 1,
        name: 'Fernando',
        lastname: 'Pereira',
        gender: 'M'
    },

    {
        id: 2,
        name: 'Rocio',
        lastname: 'Ponce',
        gender: 'F'
    },

    {
        id: 3,
        name: 'Silvana',
        lastname: 'Pereira',
        gender: 'F'
    },

    {
        id: 4,
        name: 'Bautista',
        lastname: 'Ponce',
        gender: 'M'
    }
]

app.get('/users', (req, res) => {
    const gender = req.query.gender

    if (!gender) {
        return res.send(users)
    }

    const usersFiltered = users.filter(user => user.gender === gender)

    return res.send(usersFiltered)
})

app.get('/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId)
    
    const includeId = req.query.includeId === 'true'
    console.log(includeId, typeof includeId)
    
    const user = users.find(user => user.id === userId)

    if (!user) {
        return res.send({})
    }
    
const userCopy = {...user}

    if (!includeId) {
        delete userCopy.id
    }

    return res.send(userCopy)
})


app.listen(8080, () => {
    console.log('Servidor Express escuchando en el puerto 8080')
})

/*
//EJERCICIO EN CLASE
const express = require('express')
const app = express()

const bienvenida = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home</title>
    </head>
    <body>
        <h1 style="color: blue;">Bienvenidos a la pagina</h1>
    </body>
    </html>`

const usuario = {
    nombre: 'Fernando',
    apellido: 'Pereira',
    edad: 39,
    correo: 'ferpereira@hotmail.com'
}

app.get('/bienvenida', (req, res) => {
    return res.send(bienvenida)
})

app.get('/usuario', (req, res) => {
    return res.send(usuario)
})

app.listen(8080, () => {
    console.log('Estamos escuchando el puerto 8080 que cree solito')
})
*/