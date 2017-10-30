import { createReducer, createAction } from 'redux-act'
// import { loop, Cmd } from 'redux-loop'
import axios from 'axios'
import R from 'ramda'

const initialState = {
  customers: []
}

// export const fetchCustomers = createAction('VOLT/CUSTOMERS/FETCH_CUSTOMERS')
// Fetch
const fetchCustomerSucess = createAction('VOLT/CUSTOMERS/FETCH_CUSTOMERS_SUCCESS')
const fetchCustomerFailure = createAction('VOLT/CUSTOMERS/FETCH_CUSTOMERS_FAILURE')

// Create
const createCustomerSuccess = createAction('VOLT/CUSTOMERS/CREATE_CUSTOMERS_SUCCESS')
const createCustomerFailure = createAction('VOLT/CUSTOMERS/CREATE_CUSTOMERS_FAILURE')

// Edit
const deleteCustomerSuccess = createAction('VOLT/CUSTOMERS/DELETE_CUSTOMERS_SUCCESS')
const deleteCustomerFailure = createAction('VOLT/CUSTOMERS/DELETE_CUSTOMERS_FAILURE')

// Delete
const editCustomerSuccess = createAction('VOLT/CUSTOMERS/EDIT_CUSTOMERS_SUCCESS')
const editCustomerFailure = createAction('VOLT/CUSTOMERS/EDIT_CUSTOMERS_FAILURE')

const request = () => axios.get('/api/customers')

const requestPost = customer => console.log(customer) || axios.post('/api/customers', { name: R.prop('name', customer), address: R.prop('address', customer), phone: R.prop('phone', customer) })

const requestDelete = id => axios.delete(`/api/customers/${id}`)

const requestEdit = customer => axios.put(`/api/customers/${R.prop('id', customer)}`, { name: R.prop('name', customer), address: R.prop('address', customer), phone: R.prop('phone', customer) })

// Fetch
export const fetchCustomers = () => dispatch => {
  request()
    .then(response => dispatch(fetchCustomerSucess(response.data)))
    .catch(error => dispatch(fetchCustomerFailure(error)))
}

const handleFetchCustomersSuccess = (state, customers) => ({
  ...state,
  customers
})

const handleFetchCustomersFailure = (state, error) => ({
  ...state,
  error
})

// Create
export const createCustomer = customer => dispatch => {
  requestPost(customer)
    .then(response => dispatch(createCustomerSuccess(response.data)))
    .catch(error => dispatch(createCustomerFailure(error)))
}

const handleCreateCustomersSuccess = (state, customers) => console.log(customers) || ({
  ...state,
  customers: [...state.customers, customers] // TODO доработать value
})

const handleCreateCustomersFailure = (state, error) => ({
  ...state,
  error
})

// Edit
export const editCustomer = customer => dispatch => {
  requestEdit(customer)
    .then(response => dispatch(editCustomerSuccess(response.data)))
    .catch(error => dispatch(editCustomerFailure(error)))
}

const handleEditCustomerSuccess = (state, customers) => {
  const editCustomers = R.map(customer => R.prop('id', customer) === R.prop('id', customers) ? customers : customer, state.customers)
  return ({
    ...state,
    customers: editCustomers
  })
}

const handleEditCustomerFailure = (state, error) => ({
  ...state,
  error
})

// Delete
export const deleteCustomer = id => dispatch => {
  requestDelete(id)
    .then(response => dispatch(deleteCustomerSuccess(response.data.id)))
    .catch(error => dispatch(deleteCustomerFailure(error)))
}

const handleDeleteCustomerSuccess = (state, id) => ({
  ...state,
  customers: state.customers.filter(customer => R.prop('id', customer) !== id)
})

const handleDeleteCustomerFailure = (state, error) => ({
  ...state,
  error
})


const reducer = createReducer(on => {
  // on(fetchCustomers, handleFetchCustomers)
  on(fetchCustomerSucess, handleFetchCustomersSuccess)
  on(createCustomerSuccess, handleCreateCustomersSuccess)
  on(fetchCustomerFailure, handleFetchCustomersFailure)
  on(createCustomerFailure, handleCreateCustomersFailure)
  on(editCustomerSuccess, handleEditCustomerSuccess)
  on(editCustomerFailure, handleEditCustomerFailure)
  on(deleteCustomerSuccess, handleDeleteCustomerSuccess)
  on(deleteCustomerFailure, handleDeleteCustomerFailure)
}, initialState)

export default reducer
