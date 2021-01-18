import React, {Component} from 'react'

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

  handleSubmit(evt) {
    evt.preventDefault()
    console.log(this.state.email)
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

export default GuestCheckout
