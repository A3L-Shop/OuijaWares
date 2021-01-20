import Axios from 'axios'
import {modifyError} from './error'

// action type
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const EDIT_INVENTORY = 'EDIT_INVENTORY'

// action creator
export const getAllProducts = products => {
  return {
    type: GET_ALL_PRODUCTS,
    products
  }
}

const editInventory = (productId, newInventory) => {
  return {
    type: EDIT_INVENTORY,
    productId,
    newInventory
  }
}

// thunks
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/products')
      dispatch(getAllProducts(data))
    } catch (error) {
      dispatch(modifyError(error))
    }
  }
}

export const editInventoryAmount = (productId, newInventory, user) => {
  return async dispatch => {
    try {
      if (user.isAdmin) {
        await Axios.put(`/api/products/${productId}`, {
          inventoryAmount: newInventory,
          //maybe
          user: user
        })
        dispatch(editInventory(productId, newInventory))
      }
    } catch (error) {
      dispatch(modifyError(error))
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
    case EDIT_INVENTORY: {
      const newState = state.map(product => {
        if (product.id === action.productId) {
          const newProduct = {...product}
          newProduct.inventoryAmount = action.newInventory
          return newProduct
        } else {
          return product
        }
      })
      return newState
    }
    default:
      return state
  }
}
