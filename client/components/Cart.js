import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'

export class Cart extends Component {
  render() {
    let totalPrice = 0
    const items = this.props.cartItems

    return (
      <div>
        <h2>Your Cart</h2>
        {Object.keys(items).length ? (
          Object.keys(items).map(id => {
            totalPrice += items[id].product.price * items[id].quantity
            return <CartItem item={items[id]} key={id} />
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
