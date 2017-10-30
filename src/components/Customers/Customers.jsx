import React, { Component } from 'react'
import { PropTypes as pt } from 'prop-types'
// import R from 'ramda'
import memoizee from 'memoizee'
import { PageHeader, Button } from 'react-bootstrap'
import CustomerForm from 'containers/CustomerFormContainer'
import Modal from 'containers/ModalContainer'
import CustomerTable from './CustomerTable'
import { listField } from './CustomerForm/CustomerForm.mock'
import './Customers.styl'

class Customers extends Component {
  static propTypes = {
    customers: pt.array,
    fetchCustomers: pt.func,
    onShowModal: pt.func,
    createCustomer: pt.func,
    modalType: pt.string,
    customerId: pt.number,
    changeModalValues: pt.func,
    editCustomer: pt.func,
    deleteCustomer: pt.func,
    customer: pt.object
  }

  static defaultProps = {
    customers: [],
    fetchCustomers: () => { },
    changeModalValues: () => { },
    createCustomer: () => { },
    editCustomer: () => { },
    deleteCustomer: () => { },
    onShowModal: () => { },
    customer: {}
  }

  componentDidMount() {
    this.props.fetchCustomers()
  }

  handleOpen = memoizee(type => customer => {
    this.props.onShowModal({ type, customer })
  })

  handleCreateOpen = memoizee(type => () => {
    this.props.onShowModal({ type })
  })

  createCustomer = memoizee(customer => () => {
    this.props.createCustomer(customer)
  })

  editCustomer = memoizee(customer => () => {
    this.props.editCustomer(customer)
  })

  deleteCustomer = memoizee(customerId => () => {
    this.props.deleteCustomer(customerId)
  })

  handleChange = (type, e) => {
    const obj = {}
    obj[type] = e.target.value
    this.props.changeModalValues(obj)
  }

  render() {
    const {
      customers, modalType,
      customerId, customer
    } = this.props
    const typeEdit = modalType === 'edit'
    const typeDelete = modalType === 'delete'
    return (
      <section className='customers'>
        <PageHeader>
          Customer list
          <div className='customersButton'>
            <Button onClick={this.handleCreateOpen('create')}>Create</Button>
          </div>
        </PageHeader>
        <CustomerTable
          customers={customers}
          confirmDelete={this.handleOpen('delete')}
          onEdit={this.handleOpen('edit')}
        />
        {typeDelete ?
          <Modal
            title='Confirm delete'
            clickButton={this.deleteCustomer(customerId)}
            textButton='Delete'
          >
            Удалить?
          </Modal>
          :
          <Modal
            title={typeEdit ? 'Edit customer' : 'Create customer'}
            clickButton={typeEdit ? this.editCustomer(customer) : this.createCustomer(customer)}
            textButton={typeEdit ? 'Edit' : 'Create'}
          >
            <CustomerForm
              listField={listField}
              onChange={this.handleChange}
            />
          </Modal>
        }
      </section>
    )
  }
}

export default Customers
