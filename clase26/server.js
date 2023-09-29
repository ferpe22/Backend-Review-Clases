const express = require('express')
const toyRouter = require('./routers/toysRouter')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  return res.json({
    status: 'running',
    date: new Date()
  })
})

app.use('/api/toys', toyRouter)

const PORT = 8080

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))

