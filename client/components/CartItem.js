import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteLineItem, updateLineItem} from '../store/cart'

//find a way to not let anyone type into quantity input field
//find a way to only add as much as inventory allows into cart in Product component

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
    let newQuantity = this.state.quantity + num
    if (newQuantity < 1) {
      return
    }
    if (newQuantity > this.props.item.product.inventoryAmount) {
      window.alert("Oops! We don't have that many of this item.")
      return
    }
    await this.props.updateAmountInCart(
      productId,
      newQuantity,
      this.props.user.id
    )
    this.setState({
      quantity: newQuantity
    })

    console.log('hey')
  }

  async handleRemove(productId) {
    await this.props.deleteFromCart(productId, this.props.user.id)
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
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    deleteFromCart: (productId, userId) =>
      dispatch(deleteLineItem(productId, userId)),
    updateAmountInCart: (productId, newQuantity, userId) =>
      dispatch(updateLineItem(productId, newQuantity, userId))
  }
}

export default connect(mapState, mapDispatch)(CartItem)
