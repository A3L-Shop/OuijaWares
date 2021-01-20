const router = require('express').Router()
const {Order, Product, PromoCode} = require('../db')
const {isLoggedIn, isYourself} = require('./securityGate')
module.exports = router

router.get('/:id', isYourself, async (req, res, next) => {
  try {
    const userId = req.user.id
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

router.get('/:id/price', isYourself, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {userId: req.params.id, isActive: true}
    })
    const totalPrice = await order.getTotalPrice
    res.send(totalPrice)
  } catch (err) {
    next(err)
  }
})

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id
    console.log(req.body)
    const {productId, quantity} = req.body
    const cart = await Order.findOrCreate({
      where: {userId: userId, isActive: true}
    })
    const product = await Product.findByPk(productId)
    await cart[0].addProduct(product, {through: {quantity}})
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.put('/promo', isLoggedIn, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {userId: req.user.id, isActive: true}
    })
    const promo = await PromoCode.findOne({where: {code: req.body.promoCode}})
    order.setPromoCode(promo)
    res.send(promo.discount)
  } catch (err) {
    next(err)
  }
})

router.delete('/', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id
    const {productId} = req.body
    const order = await Order.findOne({
      where: {userId: userId, isActive: true}
    })
    const product = await Product.findByPk(productId)
    await order.removeProduct(product)
    order.save()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/checkout', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id
    const order = await Order.findOne({
      where: {userId: userId, isActive: true}
    })
    order.isActive = false
    order.save()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.post('/guestcheckout', async (req, res, next) => {
  try {
    const {items} = req.body
    const order = await Order.create({isActive: false})
    Object.keys(items).forEach(key => {
      order.addProduct(key, {through: {quantity: items[key].quantity}})
    })
    order.save()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
