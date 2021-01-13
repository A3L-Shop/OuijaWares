import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Cart} from './Cart'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userCart

  beforeEach(() => {
    const contents = [{product: {id: 1, name: 'mirror'}, amount: 2}]
    userCart = shallow(<Cart cartItems={contents} />)
  })

  it('renders the email in an h3', () => {
    expect(userCart.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})
