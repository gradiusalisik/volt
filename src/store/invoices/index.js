import { createReducer, createAction } from 'redux-act'
// import { loop, Cmd } from 'redux-loop'
import axios from 'axios'
// import R from 'ramda'

const initialState = {
  items: [],
  itemsById: {},
  selectedItem: false
}

// export const fetchInvoices = createAction('VOLT/INVOICES/FETCH_INVOICES')
// Fetch
const fetchInvoiceSucess = createAction('VOLT/INVOICES/FETCH_INVOICES_SUCCESS')
const fetchInvoiceFailure = createAction('VOLT/INVOICES/FETCH_INVOICES_FAILURE')

// // Create
// const createInvoiceSuccess = createAction('VOLT/INVOICES/CREATE_INVOICES_SUCCESS')
// const createInvoiceFailure = createAction('VOLT/INVOICES/CREATE_INVOICES_FAILURE')

// // Edit
// const deleteInvoiceSuccess = createAction('VOLT/INVOICES/DELETE_INVOICES_SUCCESS')
// const deleteInvoiceFailure = createAction('VOLT/INVOICES/DELETE_INVOICES_FAILURE')

// Delete
// const editInvoiceSuccess = createAction('VOLT/INVOICES/EDIT_INVOICES_SUCCESS')
// const editInvoiceFailure = createAction('VOLT/INVOICES/EDIT_INVOICES_FAILURE')

const request = () => axios.get('/api/invoices')

// const requestPost = invoice => axios.post('/api/invoices', { customer: R.prop('customer', invoice), discount: R.prop('discount', invoice), total: R.prop('total', invoice) })

// const requestDelete = id => axios.delete(`/api/invoices/${id}`)

// const requestEdit = invoice => axios.put(`/api/invoices/${R.prop('id', invoice)}`, { customer: R.prop('customer', invoice), discount: R.prop('discount', invoice), total: R.prop('total', invoice) })

// Fetch
export const fetchInvoices = () => dispatch => {
  request()
    .then(response => dispatch(fetchInvoiceSucess(response.data)))
    .catch(error => dispatch(fetchInvoiceFailure(error)))
}

const handleFetchInvoicesSuccess = (state, items) => ({
  ...state,
  items,
  itemsById: items.reduce((acc, item) => ({ [item.id]: item }), {})
})

const handleFetchInvoicesFailure = (state, error) => ({
  ...state,
  error
})

// // Create
// export const createInvoice = invoice => dispatch => {
//   requestPost(invoice)
//     .then(response => dispatch(createInvoiceSuccess(response.data)))
//     .catch(error => dispatch(createInvoiceFailure(error)))
// }

// const handleCreateInvoicesSuccess = (state, invoices) => ({
//   ...state,
//   invoices: [...state.invoices, invoices] // TODO доработать value
// })

// const handleCreateInvoicesFailure = (state, error) => ({
//   ...state,
//   error
// })

// // Edit
// export const editInvoice = invoice => dispatch => {
//   requestEdit(invoice)
//     .then(response => dispatch(editInvoiceSuccess(response.data)))
//     .catch(error => dispatch(editInvoiceFailure(error)))
// }

// const handleEditInvoiceSuccess = (state, invoices) => {
//   const editInvoices = R.map(invoice => R.prop('id', invoice) === R.prop('id', invoices) ? invoices : invoice, state.invoices)
//   return ({
//     ...state,
//     invoices: editInvoices
//   })
// }

// const handleEditInvoiceFailure = (state, error) => ({
//   ...state,
//   error
// })

// // Delete
// export const deleteInvoice = id => dispatch => {
//   requestDelete(id)
//     .then(response => dispatch(deleteInvoiceSuccess(response.data.id)))
//     .catch(error => dispatch(deleteInvoiceFailure(error)))
// }

// const handleDeleteInvoiceSuccess = (state, id) => ({
//   ...state,
//   invoices: state.invoices.filter(invoice => R.prop('id', invoice) !== id)
// })

// const handleDeleteInvoiceFailure = (state, error) => ({
//   ...state,
//   error
// })


const reducer = createReducer(on => {
  // on(fetchInvoices, handleFetchInvoices)
  on(fetchInvoiceSucess, handleFetchInvoicesSuccess)
  on(fetchInvoiceFailure, handleFetchInvoicesFailure)
  // on(createInvoiceSuccess, handleCreateInvoicesSuccess)
  // on(createInvoiceFailure, handleCreateInvoicesFailure)
  // on(editInvoiceSuccess, handleEditInvoiceSuccess)
  // on(editInvoiceFailure, handleEditInvoiceFailure)
  // on(deleteInvoiceSuccess, handleDeleteInvoiceSuccess)
  // on(deleteInvoiceFailure, handleDeleteInvoiceFailure)
}, initialState)

export default reducer
