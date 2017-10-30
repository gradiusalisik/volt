import { connect } from 'react-redux'
import { fetchProducts, createProduct, deleteProduct, editProduct } from '../../store/products'
import { onShowModal, changeModalValues } from '../../store/modal'

import Products from '../../components/Products'

const mapActionCreators = {
  fetchProducts,
  onShowModal,
  changeModalValues,
  createProduct,
  editProduct,
  deleteProduct
}

const mapStateToProps =
  ({
    products: { products },
    modal: { modalType, productId, product }
  }) => ({
    products,
    modalType,
    productId,
    product
  })

export default connect(mapStateToProps, mapActionCreators)(Products)
