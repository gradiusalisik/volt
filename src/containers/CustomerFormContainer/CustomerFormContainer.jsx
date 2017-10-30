import { connect } from 'react-redux'

import CustomerForm from 'components/Customers/CustomerForm'

const mapActionCreators = {

}

const mapStateToProps =
  ({
    modal: { customer }
  }) => ({
    customer
  })

export default connect(mapStateToProps, mapActionCreators)(CustomerForm)
