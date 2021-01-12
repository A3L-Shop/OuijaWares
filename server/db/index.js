const db = require('./db')

// register models
const {User, Product} = require('./models')

module.exports = {db, User, Product}
