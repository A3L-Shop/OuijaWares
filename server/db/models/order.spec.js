const {expect} = require('chai')
const {db, Order, Product, PromoCode} = require('../index')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('getTotalPrice', () => {
      let order1
      let order2
      let code

      beforeEach(async () => {
        order1 = await Order.create({})
        order2 = await Order.create({})
        const book = await Product.create({
          name: 'book',
          description: 'A book',
          price: 10.0,
          inventoryAmount: 10
        })
        await order1.addProduct(book, {through: {quantity: 4}})
        await order2.addProduct(book, {through: {quantity: 4}})
        code = await PromoCode.create({
          code: 'yay',
          discount: 0.5
        })
        await order2.setPromoCode(code)
      })

      it('returns total price of all products in order', async () => {
        expect(await order1.getTotalPrice()).to.be.equal(40)
      })

      it('applies promo code discount to price', async () => {
        expect(await order2.getTotalPrice()).to.be.equal(20)
      })
    }) // end describe('getTotalPrice')
  }) // end describe('instanceMethods')
}) // end describe('Order model')
