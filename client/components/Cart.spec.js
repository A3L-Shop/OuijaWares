import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Cart from './Cart'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Cart', () => {
  let userCart

  beforeEach(() => {
    // const contents = [
    //   {product: {id: 1, name: 'mirror', price: 5.55}, amount: 2},
    //   {product: {id: 2, name: 'picture', price: 10.65}, amount: 1}
    // ]
    userCart = shallow(<Cart />)
  })

  it('renders an h2 element', () => {
    expect(userCart.find('h2').text()).to.be.equal('Your Cart')
  })
})
