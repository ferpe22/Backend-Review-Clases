const { Router } = require('express')
const sessionRouter = new Router()
const passport = require('passport')

sessionRouter.post('/register', passport.authenticate('register', { failureRedirect: '/register'}), async (req, res) => {
  return res.json(req.user)
})

sessionRouter.post('/login', passport.authenticate('login', { failureRedirect: '/login', failureFlash: true }), async (req, res) => {
  return res.json(req.user)
})

module.exports = sessionRouter