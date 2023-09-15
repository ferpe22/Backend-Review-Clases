const mongoose = require('mongoose')

const { faker } = require('@faker-js/faker');

const  createRandomUser = () => {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    }
}
    
const userSchema = mongoose.Schema({
    userId: String,
    username: String,
    email: String,
    avatar: String,
    password: String,
    birthdate: Date,
    registeredAt: Date,
})

const userModel = mongoose.model('users', userSchema)

const MONGODB_CONNCECT = 'mongodb+srv://ferpereira22:franco15@cluster0.1l8kmh9.mongodb.net/clase16?retryWrites=true&w=majority'

mongoose.connect(MONGODB_CONNCECT)
    .then(async _ => {
        console.log('conectado a la base de datos')

        for(let i = 0; i < 5000; i++){
            const randomUser = createRandomUser()
            await userModel.create(randomUser)
            console.log(`${i}`)
        }
    })
    .catch((error) => console.log(error))