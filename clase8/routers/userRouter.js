const { Router } = require('express')

const userRouter = Router()

const users = [
    {
        id: 1,
        name: 'Fernando',
        lastname: 'Pereira',
        gender: 'M'
    },

    {
        id: 2,
        name: 'Rocio',
        lastname: 'Ponce',
        gender: 'F'
    },

    {
        id: 3,
        name: 'Silvana',
        lastname: 'Pereira',
        gender: 'F'
    },

    {
        id: 4,
        name: 'Bautista',
        lastname: 'Ponce',
        gender: 'M'
    }
]

userRouter.get('/', (req, res, next) => {
    console.log('Pasando por el primer middleware')
    //return res.status(401).send('No autorizado')//lo resuelve antes de pasar por el resto de los middleware e inclusive antes de resolver el controlador
    return next()
}, (req, res, next) => {
    console.log('Pasando por el segundo middleware')
    
    return next()
} , async (req, res) => {
    console.log('Pasando por el controlador')
    const gender = req.query.gender

    if (!gender) {
        return res.send(users)
    }

    const usersFiltered = users.filter(user => user.gender === gender)

    return res.send(usersFiltered)
})

userRouter.get('/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId)
    
    //const includeId = req.query.includeId === 'true'
    //console.log(includeId, typeof includeId)
    
    const user = users.find(user => user.id === userId)

        if (!user) {
        return res.status(404).json({
            error: 'User not found'
        })
    }
    
    //const userCopy = {...user}

    /*if (!includeId) {
        delete userCopy.id
    }*/

    return res.send(user)
})

userRouter.post('/', (req, res) => {
    const user = req.body
    user.id = users.length + 1
    
    users.push(user)

    return res.status(201).json(user) 
})

userRouter.put('/:userId', (req, res) => {
    const data = req.body
    const userId = parseInt(req.params.userId)
    const user = users.find(user => user.id === userId)

    if (!user) {
        return res.status(404).json({
            error: 'User not found'
        })
    }

    user.name = data.name || user.name
    user.lastname = data.lastname || user.lastname
    user.gender = data.gender || user.gender

    return res.json(user)

})

userRouter.delete('/:userId', (req, res) => {
    const userId = parseInt(req.params.userId)
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex === -1) {
        return res.status(404).json({
            error: 'User not found'
        })
    }

    users.splice(userIndex, 1)

    return res.status(204).json({})

})

module.exports = userRouter