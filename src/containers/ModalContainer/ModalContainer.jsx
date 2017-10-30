import { connect } from 'react-redux'
import { onCloseModal } from '../../store/modal'
import Modal from '../../components/Modal'

const mapActionCreators = {
  onCloseModal
}

const mapStateToProps =
  ({
    modal: { showModal, product, customer }
  }) => ({
    showModal,
    product,
    customer
  })

export default connect(mapStateToProps, mapActionCreators)(Modal)
