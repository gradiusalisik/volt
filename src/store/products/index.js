import { createReducer, createAction } from 'redux-act'
// import { loop, Cmd } from 'redux-loop'
import axios from 'axios'
import R from 'ramda'

const initialState = {
  products: []
}

// export const fetchProducts = createAction('VOLT/PRODUCTS/FETCH_PRODUCTS')
// Fetch
const fetchProductSucess = createAction('VOLT/PRODUCTS/FETCH_PRODUCTS_SUCCESS')
const fetchProductFailure = createAction('VOLT/PRODUCTS/FETCH_PRODUCTS_FAILURE')

// Create
const createProductSuccess = createAction('VOLT/PRODUCTS/CREATE_PRODUCTS_SUCCESS')
const createProductFailure = createAction('VOLT/PRODUCTS/CREATE_PRODUCTS_FAILURE')

// Edit
const deleteProductSuccess = createAction('VOLT/PRODUCTS/DELETE_PRODUCTS_SUCCESS')
const deleteProductFailure = createAction('VOLT/PRODUCTS/DELETE_PRODUCTS_FAILURE')

// Delete
const editProductSuccess = createAction('VOLT/PRODUCTS/EDIT_PRODUCTS_SUCCESS')
const editProductFailure = createAction('VOLT/PRODUCTS/EDIT_PRODUCTS_FAILURE')

const request = () => axios.get('/api/products')

const requestPost = product => axios.post('/api/products', { name: R.prop('name', product), price: R.prop('price', product) })

const requestDelete = id => axios.delete(`/api/products/${id}`)

const requestEdit = product => axios.put(`/api/products/${R.prop('id', product)}`, { name: R.prop('name', product), price: R.prop('price', product) })

// Fetch
export const fetchProducts = () => dispatch => {
  request()
    .then(response => dispatch(fetchProductSucess(response.data)))
    .catch(error => dispatch(fetchProductFailure(error)))
}

const handleFetchProductsSuccess = (state, products) => ({
  ...state,
  products
})

const handleFetchProductsFailure = (state, error) => ({
  ...state,
  error
})

// Create
export const createProduct = product => dispatch => {
  requestPost(product)
    .then(response => dispatch(createProductSuccess(response.data)))
    .catch(error => dispatch(createProductFailure(error)))
}

const handleCreateProductsSuccess = (state, products) => ({
  ...state,
  products: [...state.products, products] // TODO доработать value
})

const handleCreateProductsFailure = (state, error) => ({
  ...state,
  error
})

// Edit
export const editProduct = product => dispatch => {
  requestEdit(product)
    .then(response => dispatch(editProductSuccess(response.data)))
    .catch(error => dispatch(editProductFailure(error)))
}

const handleEditProductSuccess = (state, products) => {
  const editProducts = R.map(product => R.prop('id', product) === R.prop('id', products) ? products : product, state.products)
  return ({
    ...state,
    products: editProducts
  })
}

const handleEditProductFailure = (state, error) => ({
  ...state,
  error
})

// Delete
export const deleteProduct = id => dispatch => {
  requestDelete(id)
    .then(response => dispatch(deleteProductSuccess(response.data.id)))
    .catch(error => dispatch(deleteProductFailure(error)))
}

const handleDeleteProductSuccess = (state, id) => ({
  ...state,
  products: state.products.filter(product => R.prop('id', product) !== id)
})

const handleDeleteProductFailure = (state, error) => ({
  ...state,
  error
})


const reducer = createReducer(on => {
  // on(fetchProducts, handleFetchProducts)
  on(fetchProductSucess, handleFetchProductsSuccess)
  on(createProductSuccess, handleCreateProductsSuccess)
  on(fetchProductFailure, handleFetchProductsFailure)
  on(createProductFailure, handleCreateProductsFailure)
  on(editProductSuccess, handleEditProductSuccess)
  on(editProductFailure, handleEditProductFailure)
  on(deleteProductSuccess, handleDeleteProductSuccess)
  on(deleteProductFailure, handleDeleteProductFailure)
}, initialState)

export default reducer
