import React, {Component} from 'react'

export default class SingleProduct extends Component {
  render() {
    const product = this.props.product
    const {name, price, description, inventory, localSpirit, image} = product
    return (
      <div>
        <h1>Product Name {name}</h1>
        <h4> Price {price}</h4>
        <h4> Description {description} </h4>
        <h4> Inventory {inventory} </h4>
        <h4> local spirit(made in) {localSpirit} </h4>
        <img src={image} />
      </div>
    )
  }
}
