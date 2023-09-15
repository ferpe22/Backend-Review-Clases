const passport = require('passport')
const passportLocal = require('passport-local')
const userModel = require('../models/userModel')
const { creatHash, isValidPassword } = require('../utils/passwordHash')
const { model } = require('mongoose')

const LocalStrategy = passportLocal.Strategy

const InitializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
    
                if(user) {
                    console.log('Usuario ya existe')
                    return done(null, false)
                }
    
                const body = req.body
                body.password = creatHash(body.password)
                console.log({ body })
                
                const newUser = await userModel.create(body)
    
                return done(null, newUser)
            } catch (e) {
                return done(e)
            }
        }
    ))

    passport.use('login', new LocalStrategy(
        { usernameField: 'email'},
        async (email, password, done) => {
            try {
                let user = await userModel.findOne({ email: email })

                if(!user) {
                    console.log('Usuario no registrado')
                    return done(null, false, { message: 'Usuario no registrado' })
                }

                if(!isValidPassword(password, user.password)) {
                    //console.log('Datos incorrectos') 
                    return done(null, false, { message: 'Contraseña incorrecta' }) 
                }

                user = user.toObject()

                delete user.password

                done(null, user)

            } catch (e) {
                return done(e)
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
