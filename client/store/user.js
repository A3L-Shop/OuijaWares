import axios from 'axios'
import history from '../history'
import {fetchUserCart, clearCart} from './cart'
import {modifyError} from './error'
import store from './index'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me')
    dispatch(getUser(data || defaultUser))
    if (data.id) {
      dispatch(fetchUserCart(data))
    }
  } catch (error) {
    dispatch(modifyError(error))
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
    const cart = store.getState().cart
    if (Object.keys(cart).length) {
      const userId = res.data.id
      Object.keys(cart).forEach(async key => {
        await axios.post(`/api/cart`, {
          productId: key,
          userId,
          quantity: cart[key].quantity
        })
      })
    }
  } catch (authErr) {
    return dispatch(getUser({error: authErr}))
  }

  try {
    dispatch(getUser(res.data))
    dispatch(fetchUserCart(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    dispatch(modifyError(dispatchOrHistoryErr))
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    dispatch(clearCart())
    history.push('/login')
  } catch (error) {
    dispatch(modifyError(error))
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
