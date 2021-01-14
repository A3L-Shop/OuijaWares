const router = require('express').Router()
const {User, Order, Product, db, LineItem} = require('../db/models')
module.exports = router

//delete this if unnecessary one day
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const cart = Order.findOne({
      where: {userId: req.params.userId, isActive: true}
    })
    if (!cart) {
      res.sendStatus(204)
    } else {
      res.send(cart)
    }
  } catch (error) {
    next(error)
  }
})

router.post(':userId/cart', async (req, res, next) => {
  try {
    const {productId, quantity} = req.body
    const cart = await Order.findOrCreate({
      where: {userId: req.params.userId, isActive: true}
    })
    const product = await Product.findByPk(productId)
    await cart.addProduct(product, {through: {quantity}})
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/cart', async (req, res, next) => {
  try {
    const {productId, quantity} = req.body
    const order = await Order.findOne({
      where: {userId: req.params.userId, isActive: true}
    })
    const orderId = order.id
    const item = await LineItem.findOne({
      where: {productId: productId, orderId}
    })
    item.quantity = quantity
    db.save()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/cart', async (req, res, next) => {
  try {
    const {productId} = req.body
    const order = await Order.findOne({
      where: {userId: req.params.userId, isActive: true}
    })
    const orderId = order.id
    const item = await LineItem.findOne({
      where: {productId: productId, orderId}
    })
    item.delete()
    db.save()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
