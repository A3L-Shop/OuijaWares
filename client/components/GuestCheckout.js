import React, {Component} from 'react'
import {Login, GuestCheckoutForm} from './index'

export class GuestCheckout extends Component {
  render() {
    return (
      <div>
        <div className="guest">Checkout as guest</div>
        <GuestCheckoutForm history={this.props.history} />
        <div className="returning">Returning customers</div>
        <Login />
      </div>
    )
  }
}

export default GuestCheckout
