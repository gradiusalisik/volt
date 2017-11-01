import { connect } from 'react-redux'

import InvoicesFormPage from 'components/InvoicesFormPage'

const mapActionCreators = {

}

const mapStateToProps =
  ({
    modal: { invoice }
  }) => ({
    invoice
  })

export default connect(mapStateToProps, mapActionCreators)(InvoicesFormPage)
