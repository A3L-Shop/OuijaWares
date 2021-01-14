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

module.exports = Order
