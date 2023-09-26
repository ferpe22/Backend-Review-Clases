const express = require('express')
const dictionaryRouter = require('./routers/dictionaryRouter')
const petsRouter = require('./routers/petRouter')
const UserRouter = require('./routers/userRouter')

const userRouter = new UserRouter()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    return res.json({
        status: 'running',
        date: new Date()
    })
})

app.use('/api/dictionary', dictionaryRouter)
app.use('/api/pets', petsRouter)
app.use('/api/users', userRouter.getRouter())

const PORT = 8080

app.listen(PORT, () => console.log(`Servidor corriendo en e puerto ${PORT}`))