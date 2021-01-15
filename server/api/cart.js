const router = require('express').Router()
const {Order, Product, db, LineItem} = require('../db/models')
module.exports = router

const isLoggedIn = (req, res, next) => (req.user ? next() : res.sendStatus(204))

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.body.userId
    const cart = await Order.findOne({
      where: {userId: userId, isActive: true},
      include: [Product]
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

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id
    const {productId, quantity} = req.body
    const cart = await Order.findOrCreate({
      where: {userId: userId, isActive: true}
    })
    const product = await Product.findByPk(productId)
    await cart.addProduct(product, {through: {quantity}})
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.put('/', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id
    const {productId, quantity} = req.body
    const order = await Order.findOne({
      where: {userId: userId, isActive: true}
    })
    const orderId = order.id
    const item = await LineItem.findOne({
      where: {productId, orderId}
    })
    item.quantity = quantity
    db.save()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.delete('/', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id

    const {productId} = req.body
    const order = await Order.findOne({
      where: {userId: userId, isActive: true}
    })
    const orderId = order.id
    const item = await LineItem.findOne({
      where: {productId, orderId}
    })
    item.delete()
    db.save()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
