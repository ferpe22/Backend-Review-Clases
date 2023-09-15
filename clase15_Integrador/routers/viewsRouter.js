const { Router } = require('express')
const ProductManager = require('../managers/productManager')
const productManager = new ProductManager()
const productsViewsRouter = Router()

productsViewsRouter.get('/', async (req, res) => {
    const products = await productManager.getAllProducts()

    return res.render('products/products', { products })
})

module.exports = productsViewsRouter