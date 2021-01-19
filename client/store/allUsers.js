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
export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/users')
      dispatch(getAllUsers(data))
    } catch (err) {
      modifyError(err)
    }
  }
}

// initial state
const initialState = []

// reducer
export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
