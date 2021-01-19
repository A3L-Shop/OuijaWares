import React, {Component} from 'react'
import {connect} from 'react-redux'

export class CartQuantity extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const items = this.props.cartItems
    let totalQuantity = 0
    if (Object.keys(items).length) {
      const quantityArray = Object.keys(items).map(key => items[key].quantity)
      totalQuantity = quantityArray.reduce(
        (accumulator, current) => accumulator + current,
        0
      )
    }

    return totalQuantity > 0 && <span id="total-quantity">{totalQuantity}</span>
  }
}

const mapState = state => {
  return {
    cartItems: state.cart
  }
}

export default connect(mapState)(CartQuantity)
