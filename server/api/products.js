const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price', 'category', 'imageUrl']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})
