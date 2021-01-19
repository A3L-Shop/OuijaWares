import axios from 'axios'
import {modifyError} from './error'

//action type
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
const CLEAR_PRODUCT = 'CLEAR_PRODUCT'

//action creator
const setSingleProduct = product => {
  return {
    type: SET_SINGLE_PRODUCT,
    product
  }
}

export const clearProduct = () => {
  return {
    type: CLEAR_PRODUCT
  }
}

//thunk
export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(setSingleProduct(data))
    } catch (err) {
      modifyError(err)
    }
  }
}

//initial state
const initialState = {}

//reducer
export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product
    case CLEAR_PRODUCT:
      return initialState
    default:
      return state
  }
}
