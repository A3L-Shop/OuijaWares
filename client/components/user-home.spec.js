/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'
import {SignUpForm} from './auth/SignUpForm'

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
    signupForm = shallow(<SignUpForm />)
  })

  it('gives a warning if confirm password differs from password', () => {
    expect(signupForm.find('div').text()).to.include('Password must match')
  })
})
