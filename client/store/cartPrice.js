import axios from 'axios'
import {modifyError} from './error'

//action types
const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE'
const APPLY_PROMO = 'APPLY_PROMO'
const CLEAR_PRICE = 'CHECKOUT'

//action creators
const setTotalPrice = payload => {
  return {
    type: SET_TOTAL_PRICE,
    price: payload.totalPrice,
    promo: payload.promo
  }
}

const applyPromo = (promoCode, price = null) => {
  return {
    type: APPLY_PROMO,
    price,
    promoCode
  }
}

export const clearPrice = () => {
  return {
    type: CLEAR_PRICE
  }
}

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
        const res = await axios.put(`/api/cart/promo`, {promoCode, userId})
        if (res.status === 200) {
          dispatch(applyPromo(promoCode, res.data))
        }
      }
    } catch (error) {
      dispatch(modifyError(error))
    }
  }
}

//reducer
const initialState = {total: 0, promo: ''}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TOTAL_PRICE: {
      const newState = {...state}
      newState.total = action.price
      if (action.promo) {
        newState.promo = action.promo.code
      }
      return newState
    }
    case APPLY_PROMO: {
      const newState = {...state}
      if (action.price) {
        newState.total = action.price
      }
      newState.promo = action.promoCode
      return newState
    }
    case CLEAR_PRICE:
      return initialState
    default:
      return state
  }
}
