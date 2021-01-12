import React, {Component} from 'react'

export default class Product extends Component {
  render() {
    const product = this.props.product
    const {name, price, inventoryAmount, imageUrl} = product
    return (
      <div>
        <h1>{name}</h1>
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
