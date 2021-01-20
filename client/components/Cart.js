import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {checkout} from '../store/cart'
import PromoCode from './PromoCode'

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
              this.props.userId
                ? this.props.cartPrice.total.toFixed(2)
                : totalPrice
                ? totalPrice.toFixed(2)
                : '0.00'
            }`}</h3>
            {this.props.userId ? (
              <PromoCode />
            ) : (
              <div>Please log in or sign up to use promo codes!</div>
            )}
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
    userId: state.user.id,
    cartPrice: state.cartPrice
  }
}

const mapDispatch = dispatch => {
  return {
    loggedInCheckout: id => dispatch(checkout(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
