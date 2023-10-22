const express = require('express')
const compression = require('express-compression')

const CustomError = require('./services/errors/CustomError')
const EErrors = require('./services/errors/enums')
const generateUserErrorInfo = require('./services/errors/info')
const ErrorMiddleware = require('./middleware/errors')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = 8080

app.use(compression({
  broti: {
    enable: true,
    zlib: {}
  }
}))
app.get('/string', (req, res) => {
  let string = 'Soy un string ridiculamente larga. '
  for(let i = 0; i <10e4; i++ ) {
    string += 'Soy un string ridiculamente larga. '
  }

  return res.send(string)
})

const users = []

app.post('/users', (req, res) => {
  const { first_name, last_name, email} = req.body

  if(!first_name || !last_name || !email) {
    CustomError.createError({
      name: 'User creation error',
      cause: generateUserErrorInfo({ first_name, last_name, email}),
      message: 'Error trying to create user',
      code: EErrors.INVALID_TYPES_ERROR
    })
  }

  const user = {
    first_name,
    last_name,
    email
  }

  user.id = users.length + 1
  users.push(user)

  return res.json(user)
})

app.use(ErrorMiddleware)

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))