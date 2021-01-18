/* eslint-env mocha */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleProduct} from './SingleProduct'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleProduct', () => {
  const productExample1 = {
    category: 'modern',
    description: 'A haunted picture',
    id: 1,
    imageUrl: 'https://art.pixilart.com/3b9d8873b4b4abc.png',
    inventoryAmount: 1,
    name: 'Picture',
    price: 10.5
  }
  //includes  is different with equal
  it("renders a product's name, description, and price passed in as props", () => {
    const wrapper = shallow(<SingleProduct product={productExample1} />)
    expect(wrapper.find('h1').text()).to.equal('Name: Picture')
    expect(wrapper.find('#description').text()).to.includes('A haunted picture')
    expect(wrapper.find('#inventoryAmount').text()).to.includes('1')
    // expect(wrapper.find('img').text()).to.includes("https://art.pixilart.com/3b9d8873b4b4abc.png")
  })
})
