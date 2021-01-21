import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../../store'

/**
 * COMPONENT
 */
export class SignupForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      confirmPw: '',
      pwMatches: true,
      pwTooShort: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    if (this.state.password.length > 4) {
      this.setState({pwTooShort: false})
      if (this.state.password === this.state.confirmPw) {
        this.props.signupRequest(
          this.state.email,
          this.state.password,
          'signup'
        )
      } else {
        this.setState({pwMatches: false})
      }
    } else {
      this.setState({pwTooShort: true})
    }
  }

  render() {
    const {error} = this.props
    return (
      <div>
        <form onSubmit={this.handleSubmit} name="signup">
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input
              name="password"
              type="password"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">
              <small>Confirm Password</small>
            </label>
            <input
              name="confirmPw"
              type="password"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
          {!this.state.pwMatches && (
            <div className="warning">Password must match</div>
          )}
          {this.state.pwTooShort && (
            <div className="warning">Password must be at least 5 letters</div>
          )}
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">
          <button>Sign Up With Google</button>
        </a>
      </div>
    )
  }
}

const mapSignup = state => {
  return {
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    signupRequest: (email, password, formName) =>
      dispatch(auth(email, password, formName))
  }
}

export default connect(mapSignup, mapDispatch)(SignupForm)

/**
 * PROP TYPES
 */
SignupForm.propTypes = {
  error: PropTypes.object
}
