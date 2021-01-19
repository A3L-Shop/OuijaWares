const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const {isAdmin, isYourself} = require('./securityGate')

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'name', 'isAdmin']
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
  } catch (err) {
    next(err)
  }
})

// toggle admin status of user
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    const currentAdminStatus = user.isAdmin
    user.isAdmin = !currentAdminStatus
    await user.save()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
