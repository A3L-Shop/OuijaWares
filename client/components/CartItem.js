import React, {Component} from 'react'

//find a way to not let anyone type into quantity input field
//find a way to only add as much as inventory allows into cart in Product component

export class CartItem extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.item.quantity
    })
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  render() {
    const {id, name, price, inventoryAmount} = this.props.item.product
    return (
      <div id="cart-item">
        {id ? (
          <div key={id}>
            <h4>{name}</h4>
            <h4>{price}</h4>
            <div className="amount-adjust">
              <button type="submit" onCha>
                -
              </button>
              <div>{this.state.quantity}</div>
            </div>

            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max={inventoryAmount}
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </div>
        ) : (
          'Loading...'
        )}
      </div>
    )
  }
}
