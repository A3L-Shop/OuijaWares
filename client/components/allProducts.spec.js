/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './AllProducts'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllProducts', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<AllProducts />)
  })

  it('renders the words All Products in an h2', () => {
    expect(wrapper.find('h2').text()).to.be.equal('A L L // P R O D U C T S')
  })
})
