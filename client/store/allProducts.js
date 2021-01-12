import Axios from 'axios'

// action type
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

// action creator
export const getAllProducts = products => {
  return {
    type: GET_ALL_PRODUCTS,
    products
  }
}

// thunks
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/products')
      dispatch(getAllProducts(data))
    } catch (err) {
      console.log('error in fetchProducts thunk\n', err)
    }
  }
}

// initial state
const initialState = []

// reducer
export default function allProductsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
