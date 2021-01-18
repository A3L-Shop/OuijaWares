import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToUserCart, updateLineItem} from '../store/cart'

class Product extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    let newQuantity
    const product = this.props.product
    //if product is already in cart
    if (this.props.cart[product.id]) {
      newQuantity = this.props.cart[product.id].quantity + 1
    } else {
      newQuantity = 1
    }
    //if there is enough inventory
    if (newQuantity <= this.props.product.inventoryAmount) {
      //if product is already in cart
      if (newQuantity > 1) {
        await this.props.updateAmount(product.id, newQuantity, this.props.user)
      } else {
        await this.props.addToCart(product, newQuantity, this.props.user)
      }
    } else {
      console.log('not enough inventory')
    }
  }

  render() {
    const product = this.props.product
    const {name, price, inventoryAmount, imageUrl} = product
    return (
      <div>
        <Link to={`/products/${product.id}`}>
          <h1>{name}</h1>
        </Link>

        <img src={imageUrl} />
        <h4> ${price}</h4>
        {inventoryAmount ? (
          <div>
            <h4>{inventoryAmount} in stock</h4>
            <button type="button" onClick={() => this.handleClick()}>
              Add To Cart
            </button>
          </div>
        ) : (
          <h4>Sold Out</h4>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    addToCart: (product, quantity, user) =>
      dispatch(addToUserCart(product, quantity, user)),
    updateAmount: (productId, newQuantity, user) =>
      dispatch(updateLineItem(productId, newQuantity, user))
  }
}

export default connect(mapState, mapDispatch)(Product)
