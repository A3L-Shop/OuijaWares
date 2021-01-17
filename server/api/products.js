const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router
const {isAdmin} = require('./securityGate')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: [
        'id',
        'name',
        'price',
        'category',
        'imageUrl',
        'inventoryAmount'
      ]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    let product = await Product.findOne({
      where: {
        name: req.body.name
      }
    })
    if (!product.id) {
      product = await Product.create(req.body)
      res.send(product)
    } else {
      res.send('Product name already exists')
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('product name is not unique')
    }
    next(err)
  }
})

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    product.update(req.body)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.params.id}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
