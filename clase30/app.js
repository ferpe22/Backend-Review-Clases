//import express from 'express';
//import nodemailer from 'nodemailer';

const express = require('express')
const nodemailer = require('nodemailer')

const app = express()

// app.get('/mail', (req, res) => {
//   return res.send('Mail enviado')
// })

const transport = nodemailer.createTransport({
  host: 'gmail',
  port: 587,
  //secure: true,
  auth: {
    user: 'ferpereira22@gmail.com',
    pass: 'cplm ibga bvee edhd'
  }
})

app.get('/mail', async (req, res) => {
  let result = await transport.sendMail({
    from: 'ferpereira22@gmail.com',
    to: 'ferpereira22@hotmail.com',
    subject: 'Hola',
    html: `<div>
            <h1>Usted fue fernandeado</h1>
            <img src="cid:ferpe">
          </div>`,
    attachments: [{
      filename: 'fer.jpg',
      path: __dirname+'src/fer.jpg',
      cid: 'ferpe'
    }]
  })

  res.send({ status: 'sucess', result: 'Email sent' })
})

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000')
})