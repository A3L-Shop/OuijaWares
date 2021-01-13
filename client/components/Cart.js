import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  render() {
    let totalPrice = 0
    return (
      <div>
        <h2>Your Cart</h2>
        {this.props.cartItems.length ? (
          this.props.cartItems.map(item => {
            const product = item.product
            const amount = item.amount
            totalPrice += product.price * amount
            return (
              <div key={product.id}>
                <h4>{product.name}</h4>
                <h4>{amount}</h4>
              </div>
            )
          })
        ) : (
          <h4>Your cart is empty.</h4>
        )}
        <h3>{`Total Price: $${totalPrice ? totalPrice : '0.00'}`}</h3>
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
