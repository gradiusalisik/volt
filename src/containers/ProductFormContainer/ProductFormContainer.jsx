import { connect } from 'react-redux'

import ProductForm from 'components/Products/ProductForm'

const mapActionCreators = {

}

const mapStateToProps =
  ({
    modal: { product }
  }) => ({
    product
  })

export default connect(mapStateToProps, mapActionCreators)(ProductForm)
