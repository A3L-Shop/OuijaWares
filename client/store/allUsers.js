import Axios from 'axios'
import {modifyError} from './error'

// action type
const GET_ALL_USERS = 'GET_ALL_USERS'

// action creator
export const getAllUsers = users => {
  return {
    type: GET_ALL_USERS,
    users
  }
}

// thunks
export const fetchUsers = user => {
  return async dispatch => {
    try {
      if (user.isAdmin) {
        const {data} = await Axios.get('/api/users')
        dispatch(getAllUsers(data))
      }
    } catch (error) {
      modifyError(error)
    }
  }
}

// initial state
const initialState = []

// reducer
export default function allProductsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
