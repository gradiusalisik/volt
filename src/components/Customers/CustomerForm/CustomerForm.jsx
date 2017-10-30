import React, { Component } from 'react'
import { PropTypes as pt } from 'prop-types'
import memoizee from 'memoizee'
import R from 'ramda'
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel
} from 'react-bootstrap'

class CustomerForm extends Component {
  static propTypes = {
    listField: pt.array,
    onChange: pt.func,
    customer: pt.object
  }

  static defaultProps = {
    listField: [],
    onChange: () => { },
    customer: {}
  }

  handleChange = memoizee(type => e => {
    this.props.onChange(type, e)
  })

  renderField = item => (
    <FormGroup controlId={R.prop('controlId', item)} key={R.prop('controlId', item)}>
      <Col componentClass={ControlLabel} sm={2}>
        {R.prop('text', item)}
      </Col>
      <Col sm={10}>
        <FormControl
          type={R.prop('type', item)}
          value={R.prop(R.prop('changeType', item), this.props.customer)}
          onChange={this.handleChange(R.prop('changeType', item))}
          placeholder={R.prop('placeholder', item)}
        />
      </Col>
    </FormGroup>
  )

  render() {
    const { listField } = this.props
    return (
      <Form horizontal>
        {listField.map(this.renderField)}
      </Form>
    )
  }
}

export default CustomerForm
