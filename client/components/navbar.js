import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import CartQuantity from './CartQuantity'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => {
  return (
    <div id="nav-container">
      <div id="header">
        <h1>O U I J A // W A R E S </h1>
        <img src="/qtghost.png" />
      </div>
      <nav>
        <div>
          <Link to="/products">All Products</Link>
          {isAdmin && <Link to="/users">Users</Link>}
          {isAdmin && <Link to="/inventory">Inventory</Link>}
        </div>
        <div>
          {isLoggedIn ? (
            <span>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </span>
          ) : (
            <span>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </span>
          )}
          <span>
            <Link to="/cart">
              Your Cart <CartQuantity />
            </Link>
          </span>
        </div>
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
