import React, { Component } from 'react'
import { PropTypes as pt } from 'prop-types'
import { Table, Glyphicon } from 'react-bootstrap'
import R from 'ramda'
import memoizee from 'memoizee'

class CustomerTable extends Component {
  static propTypes = {
    customers: pt.array,
    onEdit: pt.func,
    confirmDelete: pt.func
  }

  static defaultProps = {
    customers: [],
    onEdit: () => { },
    confirmDelete: () => { }
  }

  handleClickEdit = memoizee(customer => () => {
    this.props.onEdit(customer)
  })

  handleClickConfirmDelete = memoizee(customer => e => {
    e.stopPropagation()
    this.props.confirmDelete(customer)
  })

  renderTableCustomer = customer => (
    <tr key={R.prop('id', customer)} onClick={this.handleClickEdit(customer)}>
      <td>{R.prop('id', customer)}</td>
      <td>{R.prop('name', customer)}</td>
      <td>{R.prop('address', customer)}</td>
      <td>{R.prop('phone', customer)}</td>
      <td><Glyphicon glyph='glyphicon glyphicon-trash' onClick={this.handleClickConfirmDelete(customer)} /></td>
    </tr>
  )

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {this.props.customers.map(this.renderTableCustomer)}
        </tbody>
      </Table>
    )
  }
}

export default CustomerTable
