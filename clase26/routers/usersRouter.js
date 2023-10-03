const { Router } = require('express')
const UsersController = require('../controllers/usersController')

const userRouter = new Router()
const usersController = new UsersController()

userRouter.get('/', usersController.getAll.bind(usersController))
userRouter.get('/:id', usersController.get.bind(usersController))
userRouter.post('/', usersController.create.bind(usersController))
userRouter.put('/:id', usersController.update.bind(usersController))
userRouter.delete('/:id', usersController.delete).bind(usersController)

userRouter.post('/login', usersController.login.bind(usersController))

module.exports = userRouter