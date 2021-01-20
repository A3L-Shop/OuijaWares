import React from 'react'
import {connect} from 'react-redux'

export const PromoCode = props => {
  const {handleSubmit} = props
  return (
    <div>
      <form onSubmit={handleSubmit} name="promoCode">
        <label htmlFor="promoCode">
          <small>Promo Code</small>
        </label>
        <input name="promoCode" type="text" />
        <div>
          <button type="submit">ADD A PROMO CODE</button>
        </div>
      </form>
    </div>
  )
}

const mapState = state => {
  return {
    cartPrice: state.cartPrice,
    user: state.user
  }
}

export default connect(mapState)(PromoCode)
