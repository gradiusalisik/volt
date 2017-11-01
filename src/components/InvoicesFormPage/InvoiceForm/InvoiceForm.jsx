import React, { Component } from 'react'
import { PropTypes as pt } from 'prop-types'
import memoizee from 'memoizee'
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap'
import R from 'ramda'
import './InvoiceForm.styl'

const customers = ['Привет', 'Пока']
const addProducts = ['Пока', 'Привет']

class InvoiceForm extends Component {
  static propTypes = {
    onChange: pt.func,
    invoice: pt.object
  }

  static defaultProps = {
    listField: [],
    invoice: {}
  }

  // handleChange = memoizee(type => e => {
  //   this.props.onChange(type, e)
  // })

  renderSelectOption = (item, key) => <option key={key} value={item}>{item}</option>

  renderSelect = (controlId, label, sizeCol, items, button=false) => (
    <FormGroup controlId={controlId}>
      <Col className='form-select' sm={sizeCol} className='selectWrapper paddingLeft_null'>
        <Col componentClass={ControlLabel} sm={2} className='labelField paddingLeft_null'>
          {label}
        </Col>
        <Col sm='12' className='selectFormControl paddingLeft_null'>
          <FormControl componentClass="select" placeholder="select">
            {items.map(this.renderSelectOption)}
          </FormControl>
        </Col>
      </Col>
      {button &&
        <Col className='formInvoiceButton paddingLeft_null' sm='2'>
          <Button onClick={this.handleAdd}>Add</Button>
        </Col>
      }
    </FormGroup>
  )

  renderField = () => (
    <FormGroup controlId='hello' className='formGroupField'>
      <Col componentClass={ControlLabel} sm={2} className='labelField paddingLeft_null'>
        Discount (%)
      </Col>
      <Col sm={4} className='paddingLeft_null'>
        <FormControl
          type='number'
          value={this.props.valueField}
          onChange={this.handleChange}
          placeholder='Enter a discount'
        />
      </Col>
    </FormGroup>
  )

  render() {
    const { listField } = this.props
    return (
      <Form horizontal className='formInvoice'>
        {this.renderField()}
        {this.renderSelect('select-customer', 'Customer', 6, customers)}
        {this.renderSelect('select-add-product', 'Add product', 5, addProducts, true)}
      </Form>
    )
  }
}

export default InvoiceForm
