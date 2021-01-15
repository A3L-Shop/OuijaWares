import Axios from 'axios'

// action type
const POPULATE_CART = 'POPULATE_CART'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const UPDATE_AMOUNT = 'UPDATE_AMOUNT'
const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART'

// action creator
const populateCart = products => {
  return {
    type: POPULATE_CART,
    products
  }
}

export const addProductToCart = (product, quantity) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    product,
    quantity
  }
}

export const updateAmount = (productId, quantity) => {
  return {
    type: UPDATE_AMOUNT,
    productId,
    quantity
  }
}

export const deleteProductFromCart = productId => {
  return {
    type: DELETE_PRODUCT_FROM_CART,
    productId
  }
}

// thunks
export const fetchUserCart = userId => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/cart', {userId})
      if (data) {
        dispatch(populateCart(data.products))
      }
    } catch (error) {
      console.error('error in fetchUserCart thunk\n', error)
    }
  }
}
export const addToUserCart = (product, quantity = 1, userId) => {
  return async dispatch => {
    try {
      await Axios.post('/api/cart', {productId: product.id, quantity, userId})
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
    // case POPULATE_CART: {
    //   return newState
    // }
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
    case UPDATE_AMOUNT: {
      const newState = {...state}
      newState[action.productId].quantity += action.quantity
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
