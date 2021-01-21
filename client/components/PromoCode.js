import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addPromoCodeToOrder} from '../store/cartPrice'

export class PromoCode extends Component {
  constructor() {
    super()
    this.state = {
      promoCode: '',
      warningMessage: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.addPromoCodeToOrder(
      this.props.user.id,
      this.state.promoCode
    )
    this.setState({
      promoCode: ''
    })
    if (this.props.cartPrice.promo.code === '') {
      this.setState({
        warningMessage: 'Sorry, this is not a valid promo code!'
      })
    }
    setTimeout(() => {
      this.setState({warningMessage: ''})
    }, 1000)
  }

  handleChange(event) {
    this.setState({
      promoCode: event.target.value
    })
  }

  render() {
    return (
      <div>
        {this.props.cartPrice.promo.length ? (
          <div>
            The spirits have accepted your promo code! Enjoy your savings,
            mortal!
          </div>
        ) : (
          <form onSubmit={this.handleSubmit} name="promoCode">
            <label htmlFor="promoCode">
              <small>Promo Code</small>
            </label>
            <input
              name="promoCode"
              type="text"
              value={this.state.promoCode}
              onChange={this.handleChange}
            />
            <div>
              <button type="submit">ADD A PROMO CODE</button>
              <div id="promo-warning">{this.state.warningMessage}</div>
            </div>
          </form>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cartPrice: state.cartPrice
  }
}

const mapDispatch = dispatch => {
  return {
    addPromoCodeToOrder: (id, promoCode) =>
      dispatch(addPromoCodeToOrder(id, promoCode))
  }
}

export default connect(mapState, mapDispatch)(PromoCode)
