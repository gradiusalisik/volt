import React, { Component } from 'react'
import { PropTypes as pt } from 'prop-types'
import memoizee from 'memoizee'
import {
  PageHeader
} from 'react-bootstrap'
import R from 'ramda'
import InvoiceForm from './InvoiceForm'

class InvoicesFormPage extends Component {
  static propTypes = {

  }

  static defaultProps = {

  }


  render() {
    return (
      <section className='invoicesFormPage'>
        <PageHeader>
          Edit Invoice
        </PageHeader>
        <InvoiceForm />
      </section>
    )
  }
}

export default InvoicesFormPage
