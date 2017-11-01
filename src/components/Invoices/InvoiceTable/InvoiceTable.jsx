import React, { Component } from 'react'
import { PropTypes as pt } from 'prop-types'
import { Table, Glyphicon } from 'react-bootstrap'
import R from 'ramda'
import memoizee from 'memoizee'
import { Link } from 'react-router-dom'

const itemsN = [
  {
    id: '1',
    customer_id: 'x-1',
    discount: 10,
    total: 55.5
  }
]

class InvoiceTable extends Component {
  static propTypes = {
    items: pt.array,
    onEdit: pt.func,
    confirmDelete: pt.func
  }

  static defaultProps = {
    items: [],
    onEdit: () => { },
    confirmDelete: () => { }
  }

  handleClickEdit = memoizee(invoice => () => {
    this.props.onEdit(invoice)
  })

  handleClickConfirmDelete = memoizee(invoice => e => {
    e.stopPropagation()
    this.props.confirmDelete(invoice)
  })

  renderTableInvoice = invoice => (
    <tr key={R.prop('id', invoice)} onClick={this.handleClickEdit(invoice)}>
      <td>{R.prop('id', invoice)}</td>
      <td>{R.prop('customer_id', invoice)}</td>
      <td>{R.prop('discount', invoice)}</td>
      <td>{R.prop('total', invoice)}</td>
      <td>
        <Link to={`invoices/${invoice.id}/edit`}>edit</Link>
      </td>
      <td><Glyphicon glyph='glyphicon glyphicon-trash' onClick={this.handleClickConfirmDelete(invoice)} /></td>
    </tr>
  )

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>customer</th>
            <th>discount</th>
            <th>total</th>
          </tr>
        </thead>
        <tbody>
          {itemsN.map(this.renderTableInvoice)}
        </tbody>
      </Table>
    )
  }
}

export default InvoiceTable
