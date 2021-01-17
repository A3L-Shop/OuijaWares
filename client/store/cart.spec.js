/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {addToUserCart} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('addToUserCart', () => {
    it('eventually dispatches the ADD_TOO_CART action', async () => {
      const fakeProduct = {id: 2, name: 'mirror'}
      await store.dispatch(addToUserCart(fakeProduct, 2))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_PRODUCT_TO_CART')
      expect(actions[0].product).to.be.deep.equal(fakeProduct)
      expect(actions[0].amount).to.be.deep.equal(2)
    })
  })
})
