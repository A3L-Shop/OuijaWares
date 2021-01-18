import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {checkout} from '../store/cart'

export class Cart extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    if (this.props.user.id) {
      await this.props.loggedInCheckout(this.props.user.id)
      this.props.history.push('/confirm')
    } else {
      this.props.history.push('/checkout')
    }
  }

  render() {
    let totalPrice = 0
    const items = this.props.cartItems

    return (
      <div>
        <h2>Your Cart</h2>
        {Object.keys(items).length ? (
          <div>
            {Object.keys(items).map(id => {
              totalPrice += items[id].product.price * items[id].quantity
              return <CartItem item={items[id]} key={id} />
            })}
            <h3>{`Total Price: $${
              totalPrice ? totalPrice.toFixed(2) : '0.00'
            }`}</h3>
            <button type="button" onClick={() => this.handleClick()}>
              Checkout
            </button>
          </div>
        ) : (
          <h4>Your cart is empty.</h4>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cartItems: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loggedInCheckout: id => dispatch(checkout(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
