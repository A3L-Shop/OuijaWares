import React, {Component} from 'react'
import {Login, GuestCheckout} from './index'

export class Checkout extends Component {
  render() {
    console.log(this.props.isLoggedIn)
    return (
      <div>
        <div>Checkout as guest</div>
        <GuestCheckout />
        <div>Returning customers</div>
        <Login />
      </div>
    )
  }
}

export default Checkout
