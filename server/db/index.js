const db = require('./db')

// register models
const {User, Product, Order, ListItem} = require('./models')

module.exports = {db, User, Product, Order, ListItem}
