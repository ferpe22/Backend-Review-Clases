const express = require('express')
const userModel = require('../models/userModel')

const sessionRouter = express.Router()

sessionRouter.get('/', (req, res) => {
    return res.json(req.session)
    if(!req.session.counter) {
        req.session.counter = 1
        req.session.name = req.query.name

        return res.json(`Bienvenido ${req.session.name}`)
    } else {
        req.session.counter++

        return res.json(`${req.session.name} has visitado esta pagina ${req.session.counter} veces`)
    }
})

sessionRouter.post('/register', async (req, res) => {
    const user = await userModel.create(req.body)

    return res.redirect('/login')
})

sessionRouter.post('/login', async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email })

    if(!user) {
        return res.status(404).json({ 
            error: 'El usuario no existe en el sistema'
        })
    }
    
    if(user.password !== req.body.password) {
        return res.status(404).json({ 
            error: 'La contaseña es incorrecta'
        })
    }

    user = user.toObject()

    delete user.password

    req.session.user = user

    return res.redirect('/profile')
})

sessionRouter.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) {
            return res.redirect('/login')
        }
    })
})

module.exports = sessionRouter