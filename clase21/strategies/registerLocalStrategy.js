const passportLocal = require('passport-local')

const LocalStrategy = passportLocal.Strategy

const registerLocalStrategy = new LocalStrategy(
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
)

module.exports = registerLocalStrategy