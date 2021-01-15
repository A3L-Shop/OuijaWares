import Axios from 'axios'

// action type
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const DECREMENT_AMOUNT = 'DECREMENT_AMOUNT'
const INCREMENT_AMOUNT = 'INCREMENT_AMOUNT'
const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART'

// action creator
export const addProductToCart = (product, quantity) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    product,
    quantity
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
export const fetchUserCart = userId => {}
export const addToUserCart = (product, quantity = 1, userId) => {
  return async dispatch => {
    try {
      await Axios.post()
      dispatch(addProductToCart(product, quantity))
    } catch (err) {
      console.log('error in addToUserCart thunk\n', err)
    }
  }
}

// initial state
const initialState = {}

// reducer
export default function allProductsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      const id = action.product.id
      const newState = {...state}
      if (newState[id]) {
        newState[id].quantity += action.quantity
        return newState
      }
      newState[id] = {
        product: action.product,
        amount: action.quantity
      }
      return newState
    }
    case DECREMENT_AMOUNT: {
      const newState = {...state}
      newState[action.productId].quantity--
      return newState
    }
    case INCREMENT_AMOUNT: {
      const newState = {...state}
      newState[action.productId].quantity++
      return newState
    }
    case DELETE_PRODUCT_FROM_CART: {
      const newState = {...state}
      delete newState[action.productId]
      return newState
    }
    default:
      return state
  }
}
