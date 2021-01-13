import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addToUserCart} from '../store/cart'

class Product extends Component {
  render() {
    const product = this.props.product
    const {name, price, inventoryAmount, imageUrl} = product
    return (
      <div>
        <h1>{name}</h1>
        <img src={imageUrl} />
        <h4> ${price}</h4>
        {inventoryAmount ? (
          <div>
            <h4>{inventoryAmount} in stock</h4>
            <button type="button" onClick={() => this.props.addToCart(product)}>
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

const mapDispatch = dispatch => {
  return {
    addToCart: (productId, amount, user) =>
      dispatch(addToUserCart(productId, amount, user))
  }
}

export default connect(null, mapDispatch)(Product)
