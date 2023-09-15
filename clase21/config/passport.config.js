const passport = require('passport')
//const GitHubStrategy = require('passport-github2')
const githubStrategy = require('../strategies/githubStrategy')
const loginLocalStrategy = require('../strategies/loginLocalStrategy')
const registerLocalStrategy = require('../strategies/registerLocalStrategy')
const userModel = require('../models/userModel')

const { generateToken } = require('../utils/jwt')

const initializePassport = () => {
    passport.use('github', githubStrategy)
    passport.use('login', loginLocalStrategy)
    passport.use('register', registerLocalStrategy)

    passport.serializeUser((user, done) => {
        console.log('serealizeUser')
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        console.log('deserealizeUser')
        let  user = await userModel.findOne({ _id: id })
        const token = generateToken(user)
        user = user.toObject()
        user.access_token = token
        console.log({ user })
        
        done (null, user)
    })
}

module.exports = initializePassport