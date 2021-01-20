const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define(
  'order',
  {
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },
  {timestamps: false}
)

Order.prototype.getTotalPrice = async function() {
  const products = await this.getProducts()
  let totalPrice = 0
  products.forEach(product => {
    const price = product.price * product['line-item'].quantity
    totalPrice += price
  })
  if (this.promoCodeId) {
    const code = await this.getPromoCode()
    totalPrice = totalPrice * code.discount
  }
  return totalPrice
}

module.exports = Order
