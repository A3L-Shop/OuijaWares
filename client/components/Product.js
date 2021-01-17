import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToUserCart} from '../store/cart'

class Product extends Component {
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
    addToCart: (product, quantity, user) =>
      dispatch(addToUserCart(product, quantity, user))
  }
}

export default connect(null, mapDispatch)(Product)
