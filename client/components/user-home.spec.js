/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'
import {SignupForm} from './auth/SignUpForm'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome email="cody@email.com" />)
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})

describe('SignUpForm', () => {
  let signupForm
  beforeEach(() => {
    signupForm = shallow(<SignupForm />)
  })

  it('gives warning when password matches', () => {
    expect(signupForm.find('div.warning')).to.have.length(0)

    // I want to simulate filling out the form but not working yet
    // simulate filling in email
    // signupForm
    //   .find('input')
    //   .at(0)
    //   .simulate('change', {target: {name: 'email', value: 'notme@email.com'}})

    // //simulate filling password with wrong data
    // signupForm
    //   .find('input')
    //   .at(1)
    //   .simulate('change', {target: {name: 'password', value: '123456'}})
    // signupForm
    //   .find('input')
    //   .at(2)
    //   .simulate('change', {target: {name: 'confirmPw', value: '1234'}})

    // //simulate clicking sign up button
    // signupForm.find('button').simulate('click')

    // expect(signupForm.find('div.warning')).to.have.length(1)
  })
})
