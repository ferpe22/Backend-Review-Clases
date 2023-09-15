const express = require('express')
const userRouter = require('./routers/userRouter')
const petRouter = require('./routers/petRouter')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/static', express.static('public'))

app.use((req, res, next) => {
    console.log('Middleware a nivel aplicación')

    return next()
})

app.use((err, req, res, next) => {
    console.log('Middleware para manejo de errores')

    return next()
})

app.use('/api/users', userRouter)
app.use('/api/pets', petRouter)


app.listen(8080, () => {
    console.log('Servidor Express escuchando en el puerto 8080')
})