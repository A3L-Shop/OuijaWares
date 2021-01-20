import axios from 'axios'
import {fetchUserCart, clearCart} from './cart'
import {modifyError} from './error'

//action types
const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE'
const CHECKOUT = 'CHECKOUT'

//action creators
const setTotalPrice = price => ({type: SET_TOTAL_PRICE, price})
const checkout = () => ({type: CHECKOUT})

//thunks
export const me = () => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me')
    dispatch(getUser(data || defaultUser))
    if (data.id) {
      dispatch(fetchUserCart(data))
    }
  } catch (error) {
    dispatch(modifyError(error))
  }
}

//reducer
export default function(state = 0, action) {
  switch (action.type) {
    case SET_TOTAL_PRICE:
      return action.user
    default:
      return state
  }
}
