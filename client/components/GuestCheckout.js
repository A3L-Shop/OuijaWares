import React, {Component} from 'react'
import {connect} from 'react-redux'
import {guestCheckout} from '../store/cart'

export class GuestCheckout extends Component {
  constructor() {
    super()
    this.state = {
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    if (this.state.email.length) {
      console.log(this.state.email)
      await this.props.guestCheckout(this.props.cart)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} name="guestCheckout">
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" onChange={this.handleChange} />
          </div>
          <button type="submit">Checkout as guest</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    guestCheckout: id => dispatch(guestCheckout(id))
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapState, mapDispatch)(GuestCheckout)
