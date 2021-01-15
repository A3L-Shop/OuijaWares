const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const isAdmin = (req, res, next) =>
  req.user.isAdmin ? next() : res.send('None shall pass')

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

const isYourself = (req, res, next) => {
  console.log('params', req.params.id)
  console.log('user', req.user.id)
  if (+req.params.id === req.user.id) {
    next()
  } else {
    res.send("you don't have access to this user")
  }
}

router.get('/:id', isYourself, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.send(user)
  } catch (error) {
    next(error)
  }
})
