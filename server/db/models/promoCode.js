const Sequelize = require('sequelize')
const db = require('../db')

const PromoCode = db.define(
  'promoCode',
  {
    code: {
      type: Sequelize.STRING,
      allowNull: false
    },
    discount: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },
  {timestamps: false}
)

module.exports = PromoCode
