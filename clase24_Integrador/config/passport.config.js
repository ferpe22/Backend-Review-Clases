const passport = require('passport')
const local = require('passport-local')
const userModel = require('../../clase20/models/userModel')
const { createHash, isValidPassword } = require('../utils/utils')

const LocalStrategy = local.Strategy

const InitializePassport = () => {
  passport.use('register', new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (req, username, password, done) => {
      try {
        const exist = await userModel.findOne({ email: username })

        if(exist) {
          console.log('Usuario ya existe')
          return done(null, false)
        }

        const newUser = {
          name: req.body.name,
          email: username,
          password: createHash(password)
        }

        const usuario = await userModel.create(newUser)

        return done(null, usuario)

      } catch (error) {
        return done(error)
      }
    }
  ))

  passport.use('login', new LocalStrategy(
    { usernameField: 'email'},
    
    async (email, password, done) => {
      try {
        const exist = userModel.findOne({ email: username })

        if(!exist) {
          console.log('Usuario no registrado')
          return done(null, false, { message: 'Usuario no registrado' })
        }

        if(!isValidPassword(password, exist.password)) {
          //console.log('Datos incorrectos') 
          return done(null, false, { message: 'Contraseña incorrecta' }) 
        }

        return done(null, exist)

      } catch (error) {
        return done(error)
      }
    }
  ))

  passport.serializeUser((user, done) => {
    console.log('serealizeUser')
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    console.log('deserealizeUser')
    const user = await userModel.findOne(id)
    done(null, user)
  })
}

module.exports = InitializePassport