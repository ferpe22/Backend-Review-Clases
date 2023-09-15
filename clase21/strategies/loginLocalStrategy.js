const passportLocal = require('passport-local')

const LocalStrategy = passportLocal.Strategy

const loginLocalStrategy = new LocalStrategy(
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
)

module.exports = loginLocalStrategy