const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://art.pixilart.com/3b9d8873b4b4abc.png'
  },
  inventoryAmount: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  {timestamps: false}
)

module.exports = Product
