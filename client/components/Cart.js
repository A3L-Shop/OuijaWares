import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  render() {
    return (
      <div>
        <h2>Your Cart</h2>
        {this.props.cartItems.length ? (
          this.props.cartItems.map(item => {
            const product = item.product
            const amount = item.amount
            return (
              <div key={product.id}>
                <h3>{product.name}</h3>
                <h4>{amount}</h4>
              </div>
            )
          })
        ) : (
          <h4>Your cart is empty.</h4>
        )}
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
