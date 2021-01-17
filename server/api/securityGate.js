// route middleware to make sure a user is logged in

// route middleware to make sure a logged in user is admin
// if user is authenticated in the session, carry on
// if they aren't redirect them to the home page**** need to fix the redirect page/ message???

const isAdmin = (req, res, next) =>
  req.user.isAdmin ? next() : res.send('None shall pass')

// route middleware to make sure a user is logged in
// if user is authenticated in the session, carry on
// if they aren't redirect them to the home page??? now send message

const isYourself = (req, res, next) => {
  if (+req.params.id === req.user.id) {
    next()
  } else {
    res.send("you don't have access to this user")
  }
}

module.exports = {
  isAdmin,
  isYourself
}
