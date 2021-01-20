import axios from 'axios'
import {modifyError} from './error'

//action types
const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE'
const CLEAR_PRICE = 'CHECKOUT'

//action creators
const setTotalPrice = price => ({type: SET_TOTAL_PRICE, price})
export const clearPrice = () => ({type: CLEAR_PRICE})

//thunks
export const fetchTotalPrice = userId => {
  return async dispatch => {
    try {
      if (userId) {
        const {data} = await axios.get(`/api/cart/${userId}/price`)
        dispatch(setTotalPrice(data))
      }
    } catch (error) {
      dispatch(modifyError(error))
    }
  }
}

export const addPromoCodeToOrder = (userId, promoCode) => {
  return async dispatch => {
    try {
      if (userId) {
        await axios.put(`/api/cart/promo`, {promoCode})
        dispatch(fetchTotalPrice(userId))
      }
    } catch (error) {
      dispatch(modifyError(error))
    }
  }
}

//reducer
const initialState = 0

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TOTAL_PRICE:
      return action.price
    case CLEAR_PRICE:
      return initialState
    default:
      return state
  }
}
