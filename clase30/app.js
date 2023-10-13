import express from 'express';
import nodemailer from 'nodemailer';

// const express = require('express')
// const nodemailer = require('nodemailer')

const app = express()

// app.get('/mail', (req, res) => {
//   res.send('Mail enviado')
// })

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000')
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  //secure: true,
  auth: {
    user: 'ferpereira22@gmail.com',
    pass: 'cplm ibga bvee edhd'
  },
  tls: {
    rejectUnauthorized: false
}
})

app.get('/mail', async (req, res) => {
  let result = await transporter.sendMail({
    from: 'ferpereira22@gmail.com',
    to: 'ferpereira22@hotmail.com',
    subject: 'Usted fue fernandeado',
    html: `<div>
            <h1>Usted fue fernandeado</h1>
            <img src="cid:fer"/>
          </div>`,
    attachments: [
      {
        filename: 'fer.jpg',
        path: './src/fer.jpg',
        cid: 'fer'
      },
      {
        filename: 'CV Fernando Pereira 2022.pdf',
        path: './src/CV Fernando Pereira 2022.pdf',
      },
      {
        filename: 'Europa 2022.xlsx',
        path: './src/Europa 2022.xlsx',
      }

    ]
  })

  res.send({ status: 'sucess', result: 'Email sent' })
})