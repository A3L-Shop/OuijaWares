import axios from 'axios'

//action type
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

//action creator
export const setSingleProduct = product => {
  return {
    type: SET_SINGLE_PRODUCT,
    product
  }
}

//thunk
export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(setSingleProduct(data))
    } catch (err) {
      console.log(err)
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
    default:
      return state
  }
}
