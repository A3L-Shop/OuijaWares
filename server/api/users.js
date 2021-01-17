const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const {isAdmin, isYourself} = require('./securityGate')

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isYourself, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.send(user)
  } catch (error) {
    next(error)
  }
})
