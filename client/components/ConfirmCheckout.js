import React from 'react'
import {Link} from 'react-router-dom'

const ConfirmCheckout = () => {
  return (
    <div>
      <h2>Success!</h2>
      <div>Your order has been fulfilled</div>
      <div>Items will be shipped as soon as they are processed</div>
      <Link to="/products">
        <button type="button">Continue shopping</button>
      </Link>
    </div>
  )
}

export default ConfirmCheckout
