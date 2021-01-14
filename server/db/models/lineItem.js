const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define(
  'line-item',
  {
    quantity: {
      type: Sequelize.INTEGER,
      validate: {
        min: 1
      }
    }
  },
  {timestamps: false}
)

module.exports = LineItem
