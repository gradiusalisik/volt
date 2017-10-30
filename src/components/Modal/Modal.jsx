import React, { Component } from 'react'
import { PropTypes as pt } from 'prop-types'
import { Button, Modal as ModalComponent } from 'react-bootstrap'

class Modal extends Component {
  static propTypes = {
    showModal: pt.bool,
    onCloseModal: pt.func,
    title: pt.string,
    children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
    clickButton: pt.func,
    textButton: pt.string
  }

  static defaultProps = {
    showModal: false,
    onCloseModal: () => {},
    clickButton: () => {}
  }

  handleClose = () => {
    this.props.onCloseModal()
  }

  handleClickButton = () => {
    this.props.clickButton()
    this.props.onCloseModal()
  }

  render() {
    const {
      title, children, textButton,
      showModal
    } = this.props
    return (
      <ModalComponent show={showModal} onHide={this.handleClose}>
        <ModalComponent.Header closeButton>
          <ModalComponent.Title> {title}</ModalComponent.Title>
        </ModalComponent.Header>
        <ModalComponent.Body>
          {children}
        </ModalComponent.Body>
        <ModalComponent.Footer>
          <Button onClick={this.handleClickButton}>{textButton}</Button>
          <Button onClick={this.handleClose}>Close</Button>
        </ModalComponent.Footer>
      </ModalComponent>
    )
  }
}

export default Modal
