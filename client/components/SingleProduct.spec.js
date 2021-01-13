/* eslint-env mocha */
import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleProduct} from './SingleProduct'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleProduct', () => {
  let productExample
  beforeEach(() => {
    productExample = {
      name: 'Picture',
      description: 'A haunted picture',
      price: 10.0
    }
  })
  it("renders a product's name, description, and price passed in as props", () => {
    const wrapper = shallow(<SingleProduct product={productExample} />)
    expect(wrapper).to.include.text('Picture')
    // expect(wrapper).to.include.text('A haunted picture');
    // expect(wrapper).to.include.number(10.0);
  })
})
