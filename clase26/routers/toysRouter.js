const { Router } = require('express')
const ToysController = require('../controllers/toysController')

const toyRouter = new Router()
const toysController = new ToysController()

toyRouter.get('/', toysController.getAll.bind(toysController))
toyRouter.get('/:id', toysController.get.bind(toysController))
toyRouter.post('/', toysController.create.bind(toysController))
toyRouter.put('/:id', toysController.update.bind(toysController))
toyRouter.delete('/:id', toysController.delete).bind(toysController)

module.exports = toyRouter