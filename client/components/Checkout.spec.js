/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import GuestCheckout from './GuestCheckout'
import ConfirmCheckout from './ConfirmCheckout'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('GuestCheckout', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<GuestCheckout />)
  })

  it('renders guest checkout option', () => {
    expect(wrapper.find('div.guest').text()).to.be.equal('Checkout as guest')
  })
  it('renders option to login before checkout', () => {
    expect(wrapper.find('div.returning').text()).to.be.equal(
      'Returning customers'
    )
  })
})

describe.only('ConfirmCheckout', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ConfirmCheckout />)
  })

  it('renders an h2 element to recognize successful checkout', () => {
    expect(wrapper.find('h2').text()).to.be.equal('Success!')
  })
  it('renders a link for users to go back to shopping', () => {
    expect(wrapper.find('Link').text()).to.be.equal('Continue shopping')
  })
})
