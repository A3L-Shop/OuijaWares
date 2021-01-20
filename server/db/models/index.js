const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const LineItem = require('./lineItem')
const PromoCode = require('./promoCode')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// User.belongsToMany(Product, {through: 'wishList'})
// Product.belongsToMany(User, {through: 'wishList'})

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Product, {through: 'line-item'})
Product.belongsToMany(Order, {through: 'line-item'})

Order.hasOne(PromoCode)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  LineItem,
  PromoCode
}
