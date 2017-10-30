import React, { Component } from 'react'
import { PropTypes as pt } from 'prop-types'
import { Table, Glyphicon } from 'react-bootstrap'
import R from 'ramda'
import memoizee from 'memoizee'

class ProductTable extends Component {
  static propTypes = {
    products: pt.array,
    onEdit: pt.func,
    confirmDelete: pt.func
  }

  static defaultProps = {
    products: [],
    onEdit: () => { },
    confirmDelete: () => { }
  }

  handleClickEdit = memoizee(product => () => {
    this.props.onEdit(product)
  })

  handleClickConfirmDelete = memoizee(product => e => {
    e.stopPropagation()
    this.props.confirmDelete(product)
  })

  renderTableProduct = product => (
    <tr key={R.prop('id', product)} onClick={this.handleClickEdit(product)}>
      <td>{R.prop('id', product)}</td>
      <td>{R.prop('name', product)}</td>
      <td>{R.prop('price', product)}</td>
      <td><Glyphicon glyph='glyphicon glyphicon-trash' onClick={this.handleClickConfirmDelete(product)} /></td>
    </tr>
  )

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {this.props.products.map(this.renderTableProduct)}
        </tbody>
      </Table>
    )
  }
}

export default ProductTable
