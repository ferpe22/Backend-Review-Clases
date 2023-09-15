const mongoose = require('mongoose')
const orderModel = require('./models/orderModel')


const MONGODB_CONNCECT = 'mongodb+srv://ferpereira22:franco15@cluster0.1l8kmh9.mongodb.net/clase17?retryWrites=true&w=majority'

//FUNCION IIFE: se declara y autimaticamente se llama para que se ejectute. No se guarda en una variable. Por eso se encierra entre () y luego se llama con otros ()
;(async () => {
    await mongoose.connect(MONGODB_CONNCECT)

    /*await orderModel.insertMany([
        { name: 'Pepperoni', size: 'large', price: 20, quantity: 10 },
        { name: 'Chesse', size: 'large', price: 23, quantity: 20 },
        { name: 'Pepperoni', size: 'large', price: 10, quantity: 15 },
        { name: 'Vegan', size: 'large', price: 27, quantity: 12 },
        { name: 'Pepperoni', size: 'large', price: 30, quantity: 20 },
        { name: 'Chesse', size: 'large', price: 24, quantity: 22 },
        { name: 'Pepperoni', size: 'large', price: 43, quantity: 1 },
        { name: 'Vegan', size: 'large', price: 10, quantity: 22 },
        { name: 'Pepperoni', size: 'large', price: 20, quantity: 10 },
        { name: 'Vegan', size: 'large', price: 20, quantity: 10 },
        { name: 'Chesse', size: 'large', price: 20, quantity: 3 },
        { name: 'Vegan', size: 'large', price: 20, quantity: 10 },
        { name: 'Chesse', size: 'large', price: 20, quantity: 5 },
        { name: 'Vegan', size: 'large', price: 20, quantity: 10 },
        { name: 'Pepperoni', size: 'large', price: 20, quantity: 8 },
        { name: 'Vegan', size: 'large', price: 20, quantity: 10 },
        { name: 'Chesse', size: 'large', price: 20, quantity: 11 },
        { name: 'Vegan', size: 'large', price: 20, quantity: 10 },
        { name: 'Chesse', size: 'large', price: 20, quantity: 21 }
    ])*/

    const orders = await orderModel.aggregate([
        {
            $match: { size: 'medium' }
        },
        {
            $group: { 
                _id: '$name',
                totalQuantity: { $sum: '$quantity' },
                totalPrice: { $sum: '$price' }
            }
        },
        {
            $sort: { totalQuantity: -1 }
        },
        {
            $group: {
                _id: 1,
                orders: {
                    $push: '$$ROOT'
                }
            }
        },
        {
            $project: {
                _id: 0,
                orders: '$orders'
            }
        }
    ])

    console.log(JSON.stringify(orders, null, 2))

})()    