import { connect } from 'react-redux'
// import { onClickCard } from '../../store/Invoices'

import Invoices from '../../components/Invoices'

const mapActionCreators = {
  // onClickCard
}

const mapStateToProps =
  ({
    todos
  }) => ({
    todos
  })

export default connect(mapStateToProps, mapActionCreators)(Invoices)
