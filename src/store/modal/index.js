import { createReducer, createAction } from 'redux-act'
import R from 'ramda'

const initialState = {
  showModal: false,
  modalType: '',
  productId: 0,
  product: {
    name: '',
    price: ''
  },
  customer: {
    name: '',
    address: '',
    phone: ''
  }
}

export const onShowModal = createAction('VOLT/MODAL/SHOW_MODAL')
export const onCloseModal = createAction('VOLT/MODAL/CLOSE_MODAL')
export const changeModalValues = createAction('VOLT/MODAL/CHANGE_MODAL_VALUES')

const handleShowModal = (state, payload) => ({
  ...state,
  modalType: R.prop('type', payload),
  productId: R.pathOr(0, ['product', 'id'], payload),
  product: { ...state.product, ...R.prop('product', payload) },
  customerId: R.pathOr(0, ['customer', 'id'], payload),
  customer: { ...state.customer, ...R.prop('customer', payload) },
  showModal: true
})

const handleChangeModalValues = (state, payload) => ({
  ...state,
  product: { ...state.product, ...payload },
  customer: { ...state.customer, ...payload }
})

const handleCloseModal = () => initialState

const reducer = createReducer(on => {
  on(onShowModal, handleShowModal)
  on(onCloseModal, handleCloseModal)
  on(changeModalValues, handleChangeModalValues)
}, initialState)

export default reducer
