import { combineReducers } from 'redux'
import products from './products'
import customers from './customers'
import invoices from './invoices'
import invoiceForm from './invoiceForm'
import modal from './modal'

export default combineReducers({
  products,
  customers,
  invoices,
  invoiceForm,
  modal
})
