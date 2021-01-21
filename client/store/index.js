import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allProducts from './allProducts'
import cart from './cart'
import singleProduct from './singleProduct'
import error from './error'
import allUsers from './allUsers'

const reducer = combineReducers({
  user,
  allProducts,
  singleProduct,
  cart,
  error,
  allUsers
})

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(reducer, middleware)

export default store
export * from './user'
