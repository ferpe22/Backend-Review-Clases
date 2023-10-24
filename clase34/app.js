const express = require('express')
const addLogger = require('./src/utils/logger')

const app = express()

app.use(addLogger)

app.get('/', (req, res) => {
  req.logger.warning('Alerta! Peligro, el dolar esta arriba de un 1k pesos')
  res.send({ message: 'Prueba de logger'})
})

app.get('/operacionsencilla', (req, res) => {
  let sum = 0
  for (let i=0; i<100000; i++) {
    sum += i
  }
  res.send({ sum })
})

app.get('/operacioncompleja', (req, res) => {
  let sum = 0
  for (let i=0; i<5e8; i++) {
    sum += i
  }
  res.send({ sum })
})


const PORT = 8080
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))