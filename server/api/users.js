const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//delete this if unnecessary one day
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
