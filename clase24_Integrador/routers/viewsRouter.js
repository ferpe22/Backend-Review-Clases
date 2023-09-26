const { Router } = require('express')
const ProductManager = require('../managers/productManager')
const productManager = new ProductManager()
const viewsRouter = Router()

viewsRouter.get('/', async (req, res) => {
    const products = await productManager.getAllProducts()

    return res.render('products/products', { products })
})

viewsRouter.get('/register', (req, res) => {
  res.render('registro')
})

viewsRouter.get('/login', (req, res) => {
  res.render('login')
})

module.exports = viewsRouter