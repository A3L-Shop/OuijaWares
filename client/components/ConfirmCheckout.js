import React from 'react'
import {Link} from 'react-router-dom'

const ConfirmCheckout = () => {
  return (
    <div>
      <h2>Success!</h2>
      <div>Your order has been fulfilled</div>
      <div>Items will be shipped as soon as they are processed</div>
      <Link to="/products">Continue shopping</Link>
    </div>
  )
}

export default ConfirmCheckout
