const { Router } = require('express')

const petsRouter = Router()

const pets = []

petsRouter.post('/', (req, res) => {
    const pet = {
        name: req.body.name,
        specie: req.body.specie
    }

    pets.push(pet)

    return res.status(201).json(pet)
})

petsRouter.param('pet', (req, res, next, value) => {
    const pet = pets.find(pet => pet.name === value)

    req.pet = pet
    return next()
})
petsRouter.get('/:pet([a-zA-Z%20]+)', (req, res) => {
    //const pet = pets.find(pet => pet.name === req.params.pet)
    const pet = req.pet

    return res.json(pet)
})

petsRouter.put('/:pet([a-zA-Z%20]+)', (req, res) => {
    //const pet = pets.find(pet => pet.name === req.params.pet)
    const pet = req.pet
    
    pet.adopted = true

    return res.json(pet)
})

module.exports = petsRouter