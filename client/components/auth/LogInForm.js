import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../../store'

/**
 * COMPONENT
 */
const LogInForm = props => {
  const {handleSubmit, error} = props
  const warningMessage = 'this is a required field!'

  return (
    <div>
      <form onSubmit={handleSubmit} name="login">
        <div>
          <label htmlFor="email">
            <small>Email</small>
            {error && warningMessage && <span>{warningMessage}</span>}
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">Login with Google</a>
    </div>
  )
}

const mapLogin = state => {
  return {
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, 'login'))
    }
  }
}

export default connect(mapLogin, mapDispatch)(LogInForm)

LogInForm.prototypes = {
  Submit: PropTypes.func.isRequired,
  error: PropTypes.object
}
