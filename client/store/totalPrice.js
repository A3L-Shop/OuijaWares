import axios from 'axios'
import {modifyError} from './error'

//action types
const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE'
const APPLY_PROMO = 'APPLY_PROMO'
const CLEAR_PRICE = 'CHECKOUT'
const UPDATE_PRICE = 'UPDATE_PRICE'

//action creators
const setTotalPrice = price => ({type: SET_TOTAL_PRICE, price})
export const updateTotalPrice = price => ({type: UPDATE_PRICE, price})
const applyPromo = discount => ({type: APPLY_PROMO, discount})
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
        const {data} = await axios.put(`/api/cart/promo`, {promoCode})
        dispatch(applyPromo(data))
      }
    } catch (error) {
      dispatch(modifyError(error))
    }
  }
}

//reducer
const initialState = {price: 0, discount: 0}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TOTAL_PRICE:
      return action.price
    case UPDATE_PRICE: {
      const newState = {...state}
      newState.price = state.price += action.price * state.discount
      return newState
    }
    case APPLY_PROMO: {
      const newState = {...state}
      newState.price = state.price * action.discount
      newState.discount = action.discount
      return newState
    }
    case CLEAR_PRICE:
      return initialState
    default:
      return state
  }
}
