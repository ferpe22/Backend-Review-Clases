const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userId: String,
    username: {
        type: String,
        index: true
    },
    email: String,
    avatar: String,
    password: String,
    birthdate: Date,
    registeredAt: Date
})

const userModel = mongoose.model('users', userSchema)

const MONGODB_CONNCECT = 'mongodb+srv://ferpereira22:franco15@cluster0.1l8kmh9.mongodb.net/clase16?retryWrites=true&w=majority'

mongoose.connect(MONGODB_CONNCECT)
    .then(async _ => {
        console.log('conectado a la base de datos')

        const response = await userModel.find({ username: 'Brian73' }).explain('executionStats')
        console.log(response)
    })
    .catch((error) => console.log(error))

    const users = [
        {
            _id: ObjectId("64db8df48eb90fba849ccc02"),
            userId: 'c62fb201-6c53-4bc3-8c80-f53fc1438e5f',
            username: 'Cayla_Corwin',
            email: 'Juanita_Farrell@yahoo.com',
            avatar: 'https://avatars.githubusercontent.com/u/72356414',
            password: '72nT3x7MwJZMhj8',
            birthdate: ISODate("1975-11-03T22:09:36.434Z"),
            registeredAt: ISODate("2023-06-27T19:54:08.508Z"),
            __v: 0
        },
        {
            _id: ObjectId("64db8df68eb90fba849ccc08"),
            userId: 'af4a51e5-72ff-4b9e-9ecc-f73c7060d8f4',
            username: 'Brian73',
            email: 'Kitty_Smitham9@hotmail.com',
            avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/898.jpg',
            password: 'R6wLH9cJjzwqy3U',
            birthdate: ISODate("1970-07-19T16:51:38.335Z"),
            registeredAt: ISODate("2023-07-17T03:22:52.708Z"),
            __v: 0
        },
        {
            _id: ObjectId("64db8df68eb90fba849ccc0a"),
            userId: 'a0546d81-8ed6-4c2e-9eff-cc4b65b27395',
            username: 'Buster.Welch99',
            email: 'Bradford_Skiles@hotmail.com',
            avatar: 'https://avatars.githubusercontent.com/u/35719684',
            password: 'BY2ST4w2SZH9Eyi',
            birthdate: ISODate("1954-04-07T11:51:42.056Z"),
            registeredAt: ISODate("2022-09-15T04:10:34.682Z"),
            __v: 0
        },
        {
            _id: ObjectId("64db8df68eb90fba849ccc0c"),
            userId: '096d46aa-7203-4640-a10f-96cf6a6cfe73',
            username: 'Donnie_Bode28',
            email: 'Carmella.Keeling52@gmail.com',
            avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/342.jpg',
            password: 'vuiGVsKB6GHh3bB',
            birthdate: ISODate("1986-12-29T15:52:34.998Z"),
            registeredAt: ISODate("2023-01-25T16:23:00.832Z"),
            __v: 0
        },
        {
            _id: ObjectId("64db8df68eb90fba849ccc0e"),
            userId: '6cef3f1f-dc34-4e5c-a73c-df6395aa8150',
            username: 'Lurline.Mueller',
            email: 'Preston.Ankunding20@gmail.com',
            avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/335.jpg',
            password: 'Z8qF2b362mQ2fPU',
            birthdate: ISODate("1945-10-20T06:08:19.319Z"),
            registeredAt: ISODate("2023-06-06T19:03:57.735Z"),
            __v: 0
        },
        {
            _id: ObjectId("64db8df78eb90fba849ccc12"),
            userId: '56ed28a8-5443-4b74-821e-eb4add1f6065',
            username: 'Nicklaus61',
            email: 'Leila_Lang@yahoo.com',
            avatar: 'https://avatars.githubusercontent.com/u/84876699',
            password: 'MPJnA8J88s4Mv8g',
            birthdate: ISODate("1968-04-19T03:52:30.111Z"),
            registeredAt: ISODate("2023-05-09T14:04:39.571Z"),
            __v: 0
        },
    ]

    //Como hariamos para encontrar a 'Brian73' en el array de users? Recorremos el array y filtramos por la conicidencia del username. MongoDB hace algo parecido a esto.
    const userMatched = users.filter(user => user.username === 'Brian73')

    const userIndexes = {
        'Cayla_Corwin': ObjectId("64db8df48eb90fba849ccc02"),
        'Brian73': ObjectId("64db8df68eb90fba849ccc08"),
        'Buster.Welch99': ObjectId("64db8df68eb90fba849ccc0a"),
        'Donnie_Bode28': ObjectId("64db8df68eb90fba849ccc0c"),
    }

    //Pero si tenemos una estructura como la de arriba (con vinculacion de la indexacion) hariamos algo asi.
    const indexMatched = userIndexes['Brian73'] //Me devuelve un id

    db.users.findeOne({ _id: indexMatched}) //con el id, lo encuentro asi



