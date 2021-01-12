/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const {db} = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const name = 'dustbunny'
    const price = 6.66
    const description = 'spooky'

    beforeEach(() => {
      return Product.create({
        name,
        price,
        description
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(name)
      expect(res.body[0].description).to.be.equal(undefined)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
