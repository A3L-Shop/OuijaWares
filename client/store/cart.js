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

// thunks
export const fetchUserCart = (user = {}) => {
  return async dispatch => {
    try {
      if (user.id) {
        const {data} = await Axios.get('/api/cart', {userId: user.id})
        dispatch(populateCart(data.products))
      }
    } catch (error) {
      console.error('error in fetchUserCart thunk\n', error)
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
    } catch (err) {
      console.log('error in addToUserCart thunk\n', err)
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
      console.error('error in fetchAndUpdateLineItem thunk\n', error)
    }
  }
}

export const deleteLineItem = (productId, user = {}) => {
  return async dispatch => {
    try {
      if (user.id) {
        await Axios.delete('/api/cart', {productId, userId: user.id})
      }
      dispatch(deleteProductFromCart(productId))
    } catch (error) {
      console.error('error in deleteLineItem thunk\n', error)
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

    case ADD_PRODUCT_TO_CART: {
      const id = action.product.id
      const newState = {...state}
      newState[id] = {
        product: action.product,
        quantity: action.quantity
      }
      return newState
    }

    case UPDATE_AMOUNT: {
      const newState = {...state}
      newState[action.productId].quantity = action.newQuantity
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
