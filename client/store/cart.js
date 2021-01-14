import Axios from 'axios'

// action type
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const DECREMENT_AMOUNT = 'DECREMENT_AMOUNT'
const INCREMENT_AMOUNT = 'INCREMENT_AMOUNT'
const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART'

// action creator
export const addProductToCart = (product, amount) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    product,
    amount
  }
}

export const decrementAmount = productId => {
  return {
    type: DECREMENT_AMOUNT,
    productId
  }
}

export const incrementAmount = productId => {
  return {
    type: INCREMENT_AMOUNT,
    productId
  }
}

export const deleteProductFromCart = productId => {
  return {
    type: DELETE_PRODUCT_FROM_CART,
    productId
  }
}

// thunks
export const addToUserCart = (product, amount = 1, user) => {
  return async dispatch => {
    try {
      //use route to add products to user's persistent cart in the database
      dispatch(addProductToCart(product, amount))
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
    case ADD_PRODUCT_TO_CART: {
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
