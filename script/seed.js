const {db, User, Product, Order} = require('../server/db')

const seed = async () => {
  try {
    await db.sync({force: true})
    const [
      picture,
      dress,
      sword,
      mirror,
      musicBox,
      book,
      vacuum,
      toaster
    ] = await Promise.all([
      Product.create({
        name: 'Picture',
        description:
          'One of these pictures will always make you feel seen, as the eyes follow everywhere you go.',
        price: 10.75,
        inventoryAmount: 12,
        imageUrl: 'https://framersworkshop.com/Heritage/pix/ovalgirl2.jpg',
        category: 'victorian'
      }),
      Product.create({
        name: 'Dress',
        description:
          'No need to hang up this beautiful piece, it stands tall and holds its shape.',
        price: 100.55,
        inventoryAmount: 2,
        imageUrl:
          'https://images.snapwi.re/3977/5bd701651ec5e15a83bad3ca.w800.jpg',
        category: 'victorian'
      }),
      Product.create({
        name: 'Sword',
        description:
          'These swords were recovered from an ancient battlefield. Sometimes they still produce the sounds of battle.',
        price: 80.95,
        inventoryAmount: 18,
        imageUrl:
          'https://i.pinimg.com/originals/f8/71/24/f871248df5dd1acfa2c64cdcd9cbf5e7.jpg',
        category: 'ancient'
      }),
      Product.create({
        name: 'Mirror',
        description:
          'A mirror is perfect in any room. Especially if you want to see what is really there.',
        price: 50.95,
        inventoryAmount: 15,
        imageUrl:
          'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1db85b88-22df-4e1a-bc9c-8fca1c94e459/d97dpa7-be9b886c-b9ba-4bd0-a28e-1402dfba9d65.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMWRiODViODgtMjJkZi00ZTFhLWJjOWMtOGZjYTFjOTRlNDU5XC9kOTdkcGE3LWJlOWI4ODZjLWI5YmEtNGJkMC1hMjhlLTE0MDJkZmJhOWQ2NS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.F5lY0bsVOvo7a0RGqtiZV8XIu4IDJwpR-puxuyZ0sRA',
        category: 'victorian'
      }),
      Product.create({
        name: 'Music Box',
        description:
          'No need to turn the crank to hear a beautiful tune. Whenever the spirit feels inspired, a beautiful song pours out.',
        price: 25.65,
        inventoryAmount: 8,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Polyphon_Spieldose_%281%29.jpg/220px-Polyphon_Spieldose_%281%29.jpg',
        category: 'modern'
      }),
      Product.create({
        name: 'Book',
        description:
          'If you want a book that opens to a random page whenever the mood strikes it, this is perfect for you.',
        price: 35.55,
        inventoryAmount: 35,
        imageUrl:
          'https://s2982.pcdn.co/wp-content/uploads/2014/06/old-books.gif',
        category: 'ancient'
      }),
      Product.create({
        name: 'Vaccum',
        description:
          'No need to do chores if the vacuum does the cleaning for you. Although, sometimes it will make the mess a bit worse.',
        price: 40.25,
        inventoryAmount: 4,
        imageUrl:
          'https://i.pinimg.com/564x/d6/3b/cf/d63bcf689981e0436c844c65f7f8eff3.jpg',
        category: 'modern'
      }),
      Product.create({
        name: 'Toaster',
        description:
          'Sometimes it creates beautiful toast, sometimes it will try to burn your hand to send you a message.',
        price: 15.25,
        inventoryAmount: 18,
        imageUrl:
          'https://i.etsystatic.com/25582825/r/il/fd35fc/2728173713/il_794xN.2728173713_13g8.jpg',
        category: 'modern'
      })
    ])

    const [sam, mark, alex, julie] = await Promise.all([
      User.create({
        email: 'sam@email.com',
        name: 'sam',
        password: '12345'
      }),
      User.create({
        email: 'mark@email.com',
        name: 'mark',
        password: '12345'
      }),
      User.create({
        email: 'alex@email.com',
        name: 'alex',
        password: '12345'
      }),
      User.create({
        email: 'julie@email.com',
        name: 'julie',
        password: '12345'
      })
    ])
    await User.create({
      email: 'admin@email.com',
      isAdmin: true,
      name: 'me',
      password: 'password'
    })

    for (let i = 0; i < 5; i++) {
      const order = await Order.create({
        isActive: false
      })
      await order.addProduct(picture)
      await sam.addOrder(order)
    }
    const [six, seven, eight, nine] = await Promise.all([
      Order.create({}),
      Order.create({}),
      Order.create({}),
      Order.create({})
    ])
    await sam.addOrder(six)
    await six.addProduct(picture, {through: {quantity: 3}})
    await six.addProduct(mirror, {through: {quantity: 2}})

    await mark.addOrder(seven)
    await seven.addProduct(dress, {through: {quantity: 1}})
    await seven.addProduct(sword, {through: {quantity: 3}})

    await alex.addOrder(eight)
    await eight.addProduct(toaster, {through: {quantity: 2}})
    await eight.addProduct(musicBox, {through: {quantity: 4}})

    await julie.addOrder(nine)
    await nine.addProduct(dress, {through: {quantity: 2}})
    await nine.addProduct(book, {through: {quantity: 8}})
    await nine.addProduct(vacuum, {through: {quantity: 1}})
  } catch (err) {
    console.error(err)
  }
}

module.exports = seed
if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!')
      db.close()
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
      db.close()
    })
}
