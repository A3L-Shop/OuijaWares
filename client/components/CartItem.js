import React, {Component} from 'react'

//find a way to not let anyone type into quantity input field
//find a way to only add as much as inventory allows into cart in Product component

export class CartItem extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.item.quantity
    })
  }

  handleClick(num) {
    let newQuantity = this.state.quantity + num
    if (newQuantity < 1) {
      return
    }
    if (newQuantity > this.props.item.product.inventoryAmount) {
      window.alert("Oops! We don't have that many of this item.")
    }
    this.setState({
      quantity: newQuantity
    })
    console.log('hey')
  }

  render() {
    const {id, name, price} = this.props.item.product
    return (
      <div id="cart-item">
        {id ? (
          <div key={id}>
            <h4>{name}</h4>
            <h4>{price}</h4>
            <span className="amount-adjust">
              <button
                id="minus"
                type="button"
                onClick={() => this.handleClick(-1)}
              >
                -
              </button>
              <div>{this.state.quantity}</div>
              <button
                id="plus"
                type="button"
                onClick={() => this.handleClick(1)}
              >
                +
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
