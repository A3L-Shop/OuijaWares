import React, {Component} from 'react'
import {connect} from 'react-redux'

export class Cart extends Component {
  constructor() {
    super()
    this.state = {
      totalPrice: 0
      //product: {productObject}, second key is quantity
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(id) {}

  render() {
    return (
      <div>
        <h2>Your Cart</h2>
        {this.props.cartItems.length ? (
          this.props.cartItems.map(item => {
            const product = item.product
            const quantity = item.quantity
            this.totalPrice += product.price * quantity
            return (
              <div key={product.id}>
                <h4>{product.name}</h4>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="0"
                  max="10"
                  value={quantity}
                  onChange={() => this.handleChange(product.id)}
                />
              </div>
            )
          })
        ) : (
          <h4>Your cart is empty.</h4>
        )}
        <h3>{`Total Price: $${this.totalPrice ? this.totalPrice : '0.00'}`}</h3>
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
