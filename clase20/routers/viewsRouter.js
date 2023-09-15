const express = require('express')

const viewsRouter = express.Router()

const sessionMiddleware = (req, res, next) => {
    if(req.session.user) {
        return res.redirect('/profile')
    } else {
        return next()
    }
}

viewsRouter.get('/register', sessionMiddleware, (req, res) => {
    return res.render('register')
})

viewsRouter.get('/login', sessionMiddleware ,(req, res) => {
    const error = req.flash('error')[0]
    console.log({ error })
    return res.render('login', { 
        error,
        hasError: error !== undefined
    })
})

viewsRouter.get('/recovery-password', sessionMiddleware ,(req, res) => {
    return res.render('recovery-password')
})

viewsRouter.get('/profile', (req, res, next) => {
    if(!req.session.user) {
        return res.redirect('/login')
    } else {
        return next()
    }
}, (req, res) => {
    const user = req.session.user
    return res.render('profile', { user })
})

module.exports = viewsRouter