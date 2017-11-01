import React, { Component } from 'react'
import { PropTypes as pt } from 'prop-types'
import memoizee from 'memoizee'
import { Link } from 'react-router-dom'
import { PageHeader, Button } from 'react-bootstrap'
import Modal from 'containers/ModalContainer'
import InvoiceTable from './InvoiceTable'
import { listField } from './InvoiceForm/InvoiceForm.mock'
import './Invoice.styl'

class Invoices extends Component {
  static propTypes = {
    items: pt.array,
    itemsById: pt.object,
    selectedItem: pt.bool,
    fetchInvoices: pt.func,
    onShowModal: pt.func,
    createInvoice: pt.func,
    modalType: pt.string,
    invoiceId: pt.number,
    changeModalValues: pt.func,
    editInvoice: pt.func,
    deleteInvoice: pt.func,
    invoice: pt.object
  }

  static defaultProps = {
    items: [],
    fetchInvoices: () => { },
    changeModalValues: () => { },
    createInvoice: () => { },
    editInvoice: () => { },
    deleteInvoice: () => { },
    onShowModal: () => { },
    invoice: {},
    itemsById: {},
    selectedItem: false
  }

  componentDidMount() {
    this.props.fetchInvoices()
  }

  // handleOpen = memoizee(type => invoice => {
  //   this.props.onShowModal({ type, invoice })
  // })

  handleCreateOpen = memoizee(type => () => {
    this.props.onShowModal({ type })
  })

  // createInvoice = memoizee(invoice => () => {
  //   this.props.createInvoice(invoice)
  // })

  // editInvoice = memoizee(invoice => () => {
  //   this.props.editInvoice(invoice)
  // })

  // deleteInvoice = memoizee(invoiceId => () => {
  //   this.props.deleteInvoice(invoiceId)
  // })

  handleChange = (type, e) => {
    const obj = {}
    obj[type] = e.target.value
    this.props.changeModalValues(obj)
  }

  render() {
    const {
      items, modalType,
      invoiceId, invoice
    } = this.props
    const typeEdit = modalType === 'edit'
    const typeDelete = modalType === 'delete'
    return (
      <section className='invoices'>
        <PageHeader>
          Invoice list
          <div className='invoicesButton'>
            <Link to='invoices/new/create'>
              <Button onClick={this.handleCreateOpen('create')}>Create</Button>
            </Link>
          </div>
        </PageHeader>
        <InvoiceTable
          items={items}
          // confirmDelete={this.handleOpen('delete')}
          // onEdit={this.handleOpen('edit')}
        />
        {typeDelete &&
          <Modal
            title='Confirm delete'
            // clickButton={this.deleteInvoice(invoiceId)}
            textButton='Delete'
          >
            Удалить?
          </Modal>
        }
      </section>
    )
  }
}

export default Invoices
