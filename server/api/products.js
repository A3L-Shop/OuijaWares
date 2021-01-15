const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

const isAdmin = (req, res, next) =>
  req.user.isAdmin ? next() : res.send('None shall pass')

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
    const {
      name,
      description,
      price,
      imageUrl,
      inventoryAmount,
      category
    } = req.body
    const product = await Product.findOrCreate({
      where: {name, description, price, imageUrl, inventoryAmount, category}
    })
    res.send(product)
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
