/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './AllProducts'

const adapter = new Adapter()
enzyme.configure({adapter})

describe.only('AllProducts', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<AllProducts />)
  })

  it('renders the words All Products in an h1', () => {
    expect(wrapper.find('h1').text()).to.be.equal('All Products')
  })
})
