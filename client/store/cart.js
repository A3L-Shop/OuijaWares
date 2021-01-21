import Axios from 'axios'
import {modifyError} from './error'

// action type
const POPULATE_CART = 'POPULATE_CART'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const UPDATE_AMOUNT = 'UPDATE_AMOUNT'
const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART'
const CLEAR_CART = 'CLEAR_CART'
const POPULATE_CART_LOCAL = 'POPULATE_CART_LOCAL'

// action creator
const populateCart = products => {
  return {
    type: POPULATE_CART,
    products
  }
}

const addProductToCart = (product, quantity) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    product,
    quantity
  }
}

const updateAmount = (productId, newQuantity) => {
  return {
    type: UPDATE_AMOUNT,
    productId,
    newQuantity
  }
}

const deleteProductFromCart = productId => {
  return {
    type: DELETE_PRODUCT_FROM_CART,
    productId
  }
}

export const clearCart = () => {
  return {
    type: CLEAR_CART
  }
}

const populateLocalCart = cart => {
  return {
    type: POPULATE_CART_LOCAL,
    localCart: cart
  }
}

// thunks
export const fetchUserCart = (user = {}) => {
  return async dispatch => {
    try {
      if (user.id) {
        const {data} = await Axios.get(`/api/cart/${user.id}`)
        if (data.products) {
          dispatch(populateCart(data.products))
        }
      } else if (JSON.parse(window.localStorage.getItem('cart'))) {
        dispatch(
          populateLocalCart(JSON.parse(window.localStorage.getItem('cart')))
        )
      }
    } catch (error) {
      dispatch(modifyError(error))
    }
  }
}

export const addToUserCart = (product, quantity = 1, user = {}) => {
  return async dispatch => {
    try {
      if (user.id) {
        await Axios.post('/api/cart', {
          productId: product.id,
          userId: user.id,
          quantity
        })
      }
      dispatch(addProductToCart(product, quantity))
    } catch (error) {
      dispatch(modifyError(error))
    }
  }
}

export const updateLineItem = (productId, newQuantity, user = {}) => {
  return async dispatch => {
    try {
      if (user.id) {
        await Axios.post('/api/cart', {
          productId,
          userId: user.id,
          quantity: newQuantity
        })
      }
      dispatch(updateAmount(productId, newQuantity))
    } catch (error) {
      dispatch(modifyError(error))
    }
  }
}

export const deleteLineItem = (productId, user = {}) => {
  return async dispatch => {
    try {
      if (user.id) {
        await Axios.delete('/api/cart', {
          data: {
            productId,
            userId: user.id
          }
        })
      }
      dispatch(deleteProductFromCart(productId))
    } catch (error) {
      dispatch(modifyError(error))
    }
  }
}

export const checkout = userId => {
  return async dispatch => {
    try {
      await Axios.put('/api/cart/checkout', {userId})
      dispatch(clearCart())
    } catch (error) {
      dispatch(modifyError(error))
    }
  }
}

export const guestCheckout = items => {
  return async dispatch => {
    try {
      await Axios.post('/api/cart/guestcheckout', {items})
      dispatch(clearCart())
    } catch (error) {
      dispatch(modifyError(error))
    }
  }
}

// initial state
const initialState = {}

// reducer
export default function allProductsReducer(state = initialState, action) {
  switch (action.type) {
    case POPULATE_CART: {
      const newState = {}
      action.products.forEach(product => {
        newState[product.id] = {
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            inventoryAmount: product.inventoryAmount,
            category: product.category
          },
          quantity: product['line-item'].quantity
        }
      })
      return newState
    }

    case POPULATE_CART_LOCAL:
      return action.localCart

    case ADD_PRODUCT_TO_CART: {
      const id = action.product.id
      const newState = {...state}
      newState[id] = {
        product: action.product,
        quantity: action.quantity
      }
      window.localStorage.setItem('cart', JSON.stringify(newState))
      return newState
    }

    case UPDATE_AMOUNT: {
      const newState = {...state}
      newState[action.productId].quantity = action.newQuantity
      window.localStorage.setItem('cart', JSON.stringify(newState))
      return newState
    }

    case DELETE_PRODUCT_FROM_CART: {
      const newState = {...state}
      delete newState[action.productId]
      window.localStorage.setItem('cart', JSON.stringify(newState))
      return newState
    }

    case CLEAR_CART:
      window.localStorage.clear()
      return initialState

    default:
      return state
  }
}
