import React, { Component } from 'react'
import { PropTypes as pt } from 'prop-types'
// import R from 'ramda'
import memoizee from 'memoizee'
import { PageHeader, Button } from 'react-bootstrap'
import ProductForm from 'containers/ProductFormContainer'
import Modal from 'containers/ModalContainer'
import ProductTable from './ProductTable'
import { listField } from './ProductForm/ProductForm.mock'
import './Products.styl'

class Products extends Component {
  static propTypes = {
    products: pt.array,
    fetchProducts: pt.func,
    onShowModal: pt.func,
    createProduct: pt.func,
    modalType: pt.string,
    productId: pt.number,
    changeModalValues: pt.func,
    editProduct: pt.func,
    deleteProduct: pt.func,
    product: pt.object
  }

  static defaultProps = {
    products: [],
    fetchProducts: () => { },
    changeModalValues: () => { },
    createProduct: () => { },
    editProduct: () => { },
    deleteProduct: () => { },
    onShowModal: () => { },
    product: {}
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  handleOpen = memoizee(type => product => {
    this.props.onShowModal({ type, product })
  })

  handleCreateOpen = memoizee(type => () => {
    this.props.onShowModal({ type })
  })

  createProduct = memoizee(product => () => {
    this.props.createProduct(product)
  })

  editProduct = memoizee(product => () => {
    this.props.editProduct(product)
  })

  deleteProduct = memoizee(productId => () => {
    this.props.deleteProduct(productId)
  })

  handleChange = (type, e) => {
    const obj = {}
    obj[type] = e.target.value
    this.props.changeModalValues(obj)
  }

  render() {
    const {
      products, modalType,
      productId, product
    } = this.props
    const typeEdit = modalType === 'edit'
    const typeDelete = modalType === 'delete'
    return (
      <section className='products'>
        <PageHeader>
          Product list
          <div className='productsButton'>
            <Button onClick={this.handleCreateOpen('create')}>Create</Button>
          </div>
        </PageHeader>
        <ProductTable
          products={products}
          confirmDelete={this.handleOpen('delete')}
          onEdit={this.handleOpen('edit')}
        />
        {typeDelete ?
          <Modal
            title='Confirm delete'
            clickButton={this.deleteProduct(productId)}
            textButton='Delete'
          >
            Удалить?
          </Modal>
          :
          <Modal
            title={typeEdit ? 'Edit product' : 'Create product'}
            clickButton={typeEdit ? this.editProduct(product) : this.createProduct(product)}
            textButton={typeEdit ? 'Edit' : 'Create'}
          >
            <ProductForm
              listField={listField}
              onChange={this.handleChange}
            />
          </Modal>
        }
      </section>
    )
  }
}

export default Products
