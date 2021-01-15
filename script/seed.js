const {green, red} = require('chalk')
const {db, User, Product} = require('../server/db')

const seed = async () => {
  try {
    await db.sync({force: true})
    const [picture, dress, sword, mirror] = await Promise.all([
      Product.create({
        name: 'Picture',
        description: 'A haunted picture',
        price: 10.0
      }),
      Product.create({
        name: 'Dress',
        description: 'A haunted dress',
        price: 10.5
      }),
      Product.create({
        name: 'Sword',
        description: 'A haunted sword',
        price: 16.0
      }),
      Product.create({
        name: 'Mirror',
        description: 'A haunted mirror',
        price: 50.0
      })
    ])

    const [me, notme] = await Promise.all([
      User.create({
        email: 'me@email.com',
        isAdmin: true,
        name: 'me',
        password: 'password'
      }),
      User.create({
        email: 'notme@email.com',
        name: 'notme',
        password: '12345'
      })
    ])
  } catch (err) {
    console.error(red(err))
  }
}

module.exports = seed
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
