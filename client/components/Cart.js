import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CartItem} from './CartItem'

export class Cart extends Component {
  constructor() {
    super()
    this.state = {
      totalPrice: 0
      //product: {productObject}, second key is quantity
    }
  }

  render() {
    // if (this.props.cartItems.length) {
    //   this.props.cartItems.forEach(item => {
    //     this.setState({
    //       totalPrice: this.state.totalPrice + (item.product.price * item.quantity)
    //     })
    // })
    // }

    let totalPrice = 0

    return (
      <div>
        <h2>Your Cart</h2>
        {this.props.cartItems.length ? (
          this.props.cartItems.map(item => {
            totalPrice += item.product.price * item.quantity
            return <CartItem item={item} key={item.id} />
          })
        ) : (
          <h4>Your cart is empty.</h4>
        )}
        <h3>{`Total Price: $${
          totalPrice ? totalPrice.toFixed(2) : '0.00'
        }`}</h3>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cartItems: state.cart
  }
}

export default connect(mapState)(Cart)
