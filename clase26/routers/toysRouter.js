const { Router } = require('express')
const ToysController = require('../controllers/toysController')
const UserMiddleware = require('../middleware/usersMiddleware')

const toyRouter = new Router()
const toysController = new ToysController()
const userMiddleware = new UserMiddleware()




/**
 * 

-Cualquier usuario logueado puede consultar los juguetes
-Solo los usuarios gerentes o admnistradores pueden editar los juguetes
-Solo los usuarios administradores puede crear nuevos juguetes
-Solo los usuarios administradores puede borrar juguetes

 */


toyRouter.get('/',
    userMiddleware.isAuth.bind(userMiddleware),
    toysController.getAll.bind(toysController)
)

toyRouter.get('/:id',
    userMiddleware.isAuth.bind(userMiddleware),
    toysController.get.bind(toysController)
)

toyRouter.post('/', toysController.create.bind(toysController))

toyRouter.put('/:id',
    userMiddleware.isAuth.bind(userMiddleware),
    toysController.update.bind(toysController)
)

toyRouter.delete('/:id', toysController.delete).bind(toysController)

module.exports = toyRouter