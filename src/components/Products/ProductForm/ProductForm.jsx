import React, { Component } from 'react'
import { PropTypes as pt } from 'prop-types'
import memoizee from 'memoizee'
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel
} from 'react-bootstrap'
import R from 'ramda'

class ProductForm extends Component {
  static propTypes = {
    listField: pt.array,
    onChange: pt.func,
    product: pt.object
  }

  static defaultProps = {
    listField: [],
    onChange: () => { },
    product: {}
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
          value={R.prop(R.prop('changeType', item), this.props.product)}
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

export default ProductForm
