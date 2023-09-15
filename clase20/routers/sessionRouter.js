const express = require('express')
const userModel = require('../models/userModel')
const { creatHash, isValidPassword } = require('../utils/passwordHash')
const passport = require('passport')

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

sessionRouter.post('/register', 
    passport.authenticate('register', { failureRedirect: '/failRegister' }), 
    async (req, res) => {
        /*const body = req.body
        body.password = creatHash(body.password)
        console.log({ body })
        const user = await userModel.create(body)

        if (req.query.client === 'view') {
            return res.redirect('/login')
        }*/

        //return res.redirect('/login')
        return res.status(201).json(req.user)
    })

sessionRouter.get('/failRegister', passport.authenticate('register', { failureRedirect: '/failRegister' }), (req, res) => {
    return res.json({
        error: 'Error en el registro'
    })
})

sessionRouter.get('/failLogin', (req, res) => {
    return res.json({
        error: 'Error al iniciar sesion'
    })
})

sessionRouter.post('/login', 
    passport.authenticate('login', { failureRedirect: '/login', failureFlash: true }),
    async (req, res) => {
    /*let user = await userModel.findOne({ email: req.body.email })

    if(!user) {
        return res.status(404).json({ 
            error: 'El usuario no existe en el sistema'
        })
    }
    
    if(!isValidPassword(req.body.password, user.password)) {
        return res.status(404).json({ 
            error: 'La contaseña es incorrecta'
        })
    }

    user = user.toObject()

    delete user.password

    req.session.user = user*/

    //return res.redirect('/profile')

    console.log({
        user: req.user,
        session: req.session
    })
    
    return res.json(req.user)
})

sessionRouter.post('/recovery-password', async (req, res) => {

    let user = await userModel.findOne({ email: req.body.email })

    if(!user) {
        return res.status(404).json({ 
            error: 'El usuario no existe en el sistema'
        })
    }
    
    const newPassword = creatHash(req.body.password)
    await userModel.updateOne({ email: user.email }, { password: newPassword })

    return res.redirect('/login')
})

sessionRouter.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) {
            return res.redirect('/login')
        }
    })
})

module.exports = sessionRouter