import React, {Component} from 'react'
import {Link} from 'react-router-dom'
export default class Product extends Component {
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
          <h4>{inventoryAmount} in stock</h4>
        ) : (
          <h4>Sold Out</h4>
        )}
      </div>
    )
  }
}
