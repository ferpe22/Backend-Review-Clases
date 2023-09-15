const GitHubStrategy = require('passport-github2')
const userModel = require('../models/userModel')


const githubStrategy = new GitHubStrategy({
    clientID: 'Iv1.58a94f7812845889',
    clientSecret: '7fcf03b664e37c5bbdff146cdb8e12c7e23ceeeb',
    callbackURL: 'http://localhost:8080/api/sessions/github-callback'
}, async (accessTokem, refreshToken, profile, done) => {
    //console.log({ accessTokem, refreshToken, profile })

    try {
        const user = await userModel.findOne({ username: profile._json.login })

        if(user) {
            console.log('Usuario ya existe')
            return done(null, user)
        }

        const newUser = await userModel.create({
            username: profile._json.login,
            name: profile._json.name
        })

        return done(null, newUser)
        
    } catch (e) {
        return done(e)
    }
})

module.exports = githubStrategy