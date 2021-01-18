import React, {Component} from 'react'
import {Login, GuestCheckoutForm} from './index'

export class GuestCheckout extends Component {
  render() {
    console.log(this.props.isLoggedIn)
    return (
      <div>
        <div>Checkout as guest</div>
        <GuestCheckoutForm history={this.props.history} />
        <div>Returning customers</div>
        <Login />
      </div>
    )
  }
}

export default GuestCheckout
