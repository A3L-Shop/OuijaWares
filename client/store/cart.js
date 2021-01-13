import Axios from 'axios'

// action type
const ADD_TO_CART = 'ADD_TO_CART'

// action creator
export const addToCart = (product, amount) => {
  return {
    type: ADD_TO_CART,
    product,
    amount
  }
}

// thunks
export const addToUserCart = (product, amount = 1, user) => {
  return async dispatch => {
    try {
      //use route to add products to user's persistent cart in the database
      dispatch(addToCart(product, amount))
    } catch (err) {
      console.log('error in addToUserCart thunk\n', err)
    }
  }
}

// initial state
const initialState = []

// reducer
export default function allProductsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, {product: action.product, amount: action.amount}]
    default:
      return state
  }
}
