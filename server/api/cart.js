const router = require('express').Router()
const {Order, Product, db, LineItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    if (!userId) {
      res.sendStatus(204)
    } else {
      const cart = Order.findOne({
        where: {userId: userId, isActive: true}
      })
      if (!cart) {
        res.sendStatus(204)
      } else {
        res.send(cart)
      }
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    if (!userId) {
      res.sendStatus(204)
    } else {
      const {productId, quantity} = req.body
      const cart = await Order.findOrCreate({
        where: {userId: userId, isActive: true}
      })
      const product = await Product.findByPk(productId)
      await cart.addProduct(product, {through: {quantity}})
      res.sendStatus(200)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    if (!userId) {
      res.sendStatus(204)
    } else {
      const {productId, quantity} = req.body
      const order = await Order.findOne({
        where: {userId: userId, isActive: true}
      })
      const orderId = order.id
      const item = await LineItem.findOne({
        where: {productId: productId, orderId}
      })
      item.quantity = quantity
      db.save()
      res.sendStatus(200)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    if (!userId) {
      res.sendStatus(204)
    } else {
      const {productId} = req.body
      const order = await Order.findOne({
        where: {userId: userId, isActive: true}
      })
      const orderId = order.id
      const item = await LineItem.findOne({
        where: {productId: productId, orderId}
      })
      item.delete()
      db.save()
      res.sendStatus(200)
    }
  } catch (error) {
    next(error)
  }
})
