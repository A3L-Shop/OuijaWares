// const {expect} = require('chai')
// const request = require('supertest')
// const {db, User} = require('../db')
// const app = require('../index')

// describe('Cart routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/cart/', () => {
//     const codysEmail = 'cody@puppybook.com'
//     const codysPassword = 'ugh'
//     const productId = 1

//     beforeEach(async () => {
//       await User.create({
//         email: codysEmail,
//         password: codysPassword
//       })
//       await request(app).post('/auth/login', {
//         email: codysEmail,
//         password: codysPassword
//       })
//     })

//     it('GET /api/cart', async () => {
//       const res = await request(app)
//         .get('/api/cart')
//         .expect(200)

//       expect(res.body).to.be.an('array')
//       expect(res.body[0].id).to.be.equal(productId)
//     })
//   }) // end describe('/api/cart')
// }) // end describe('Cart routes')
