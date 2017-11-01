import { connect } from 'react-redux'
import { fetchInvoices, createProduct, deleteProduct, editProduct } from '../../store/invoices'
import { onShowModal, changeModalValues } from '../../store/modal'

import Invoices from '../../components/Invoices'

const mapActionCreators = {
  fetchInvoices,
  onShowModal,
  changeModalValues,
  createProduct,
  editProduct,
  deleteProduct
}

const mapStateToProps =
  ({
    invoices: { items, itemsById, selectedItem },
    modal: { modalType, invoiceId, invoice }
  }) => ({
    items,
    itemsById,
    selectedItem,
    modalType,
    invoiceId,
    invoice
  })

export default connect(mapStateToProps, mapActionCreators)(Invoices)
