import { combineReducers } from 'redux'
import products from './products'
import customers from './customers'
import modal from './modal'

export default combineReducers({
  products,
  customers,
  modal
})
