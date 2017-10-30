import { connect } from 'react-redux'
import { fetchCustomers, createCustomer, deleteCustomer, editCustomer } from '../../store/customers'
import { onShowModal, changeModalValues } from '../../store/modal'

import Customers from '../../components/Customers'

const mapActionCreators = {
  fetchCustomers,
  onShowModal,
  changeModalValues,
  createCustomer,
  editCustomer,
  deleteCustomer
}

const mapStateToProps =
  ({
    customers: { customers },
    modal: { modalType, customerId, customer }
  }) => ({
    customers,
    modalType,
    customerId,
    customer
  })

export default connect(mapStateToProps, mapActionCreators)(Customers)
