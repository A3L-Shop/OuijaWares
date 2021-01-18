import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteLineItem, updateLineItem} from '../store/cart'

export class CartItem extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.item.quantity
    })
  }

  async handleClick(num, productId) {
    const newQuantity = this.state.quantity + num
    if (newQuantity < 1) {
      return
    }
    if (newQuantity > this.props.item.product.inventoryAmount) {
      console.log('not enough inventory')
      return
    }
    await this.props.updateAmountInCart(productId, newQuantity, this.props.user)
    this.setState({
      quantity: newQuantity
    })
  }

  async handleRemove(productId) {
    await this.props.deleteFromCart(productId, this.props.user)
    console.log('this item has been removed from your cart')
  }

  render() {
    const {id, name, price} = this.props.item.product
    return (
      <div id="cart-item">
        {id ? (
          <div key={id}>
            <h4>{name}</h4>
            <h4>${price}</h4>
            <span className="amount-adjust">
              <button
                id="minus"
                type="button"
                onClick={() => this.handleClick(-1, id)}
              >
                -
              </button>
              <span>{this.state.quantity}</span>
              <button
                id="plus"
                type="button"
                onClick={() => this.handleClick(1, id)}
              >
                +
              </button>
              <button
                id="remove"
                type="button"
                onClick={() => this.handleRemove(id)}
              >
                REMOVE
              </button>
            </span>
          </div>
        ) : (
          'Loading...'
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    deleteFromCart: (productId, user) =>
      dispatch(deleteLineItem(productId, user)),
    updateAmountInCart: (productId, newQuantity, user) =>
      dispatch(updateLineItem(productId, newQuantity, user))
  }
}

export default connect(mapState, mapDispatch)(CartItem)
