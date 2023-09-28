const express = require('express')
const { fork } = require('child_process')

const app = express()

app.get('/', (req, res) => {
  return res.json({
    status: 'running',
    date: new Date()
  })  
})

app.get('/suma', (req, res) => {
  //const resultado = operacionCompleja()
  const child = fork('./operacionCompleja.js')

  child.send(2000000000)

  child.on('message', result => {
    return res.send(`El resultado es ${result}`)
  })
})

app.listen(8080, () => {
  console.log('Running!')
})