import Axios from 'axios'
import {modifyError} from './error'

// action type
const GET_ALL_USERS = 'GET_ALL_USERS'
const TOGGLE_ADMIN_STATUS = 'TOGGLE_ADMIN_STATUS'

// action creator
export const getAllUsers = users => {
  return {
    type: GET_ALL_USERS,
    users
  }
}

const toggleAdmin = userId => {
  return {
    type: TOGGLE_ADMIN_STATUS,
    userId
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

export const toggleAdminStatus = id => async dispatch => {
  try {
    await Axios.put(`/api/users/${id}`)
    dispatch(toggleAdmin(id))
  } catch (err) {
    modifyError(err)
  }
}

// initial state
const initialState = []

// reducer
export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case TOGGLE_ADMIN_STATUS:
      // needs work
      return state
    default:
      return state
  }
}
