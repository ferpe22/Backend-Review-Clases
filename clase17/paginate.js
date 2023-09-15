const mongoose = require('mongoose')
const userModel = require('./models/userModel')

const MONGODB_CONNCECT = 'mongodb+srv://ferpereira22:franco15@cluster0.1l8kmh9.mongodb.net/clase16?retryWrites=true&w=majority'

;(async () => {
    await mongoose.connect(MONGODB_CONNCECT)

    //const users = await userModel.find({}).limit(50).skip(4950)
    //const totalUsers = await userModel.countDocuments({ })
    const users = await userModel.paginate({ }, { limit: 50, page: 100 })

    console.log(users)
})()