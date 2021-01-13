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
    case ADD_TO_CART: {
      const newState = [...state]
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].product.id === action.product.id) {
          newState[i].amount += action.amount
          return newState
        }
      }
      newState.push({product: action.product, amount: action.amount})
      return newState
    }
    default:
      return state
  }
}
