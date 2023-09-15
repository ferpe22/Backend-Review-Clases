const express = require('express')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const userModel = require('./models/userModel') 

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

const MONGODB_CONNCECT = 'mongodb+srv://ferpereira22:franco15@cluster0.1l8kmh9.mongodb.net/clase16?retryWrites=true&w=majority'

;(async () => {
    await mongoose.connect(MONGODB_CONNCECT)

    app.get('/', async (req, res) => {
        return res.json({
            status: 'running',
            date: new Date
        })
    })

    app.get('/students', async (req, res) => {
        const page = req.query.page || 1
        const limit = req.query.limit || 10

        const users = await userModel.paginate({ }, { limit, page, sort: { username: -1 } })

        console.log({ users })

        users.docs = users.docs.map(user => user.toObject())
        res.render('students', users)
    })

    const PORT = 8080

    app.listen(PORT, () => {
        console.log(`Sevidor corriendo en puerto ${PORT}`)
    })

})()