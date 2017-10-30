import React, { Component } from 'react'
import { PropTypes as pt } from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'

class CenterLayout extends Component {
  static propTypes = {
    children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)])
  }

  render() {
    const { children } = this.props
    return (
      <Grid>
        <Row className='row'>
          <Col xs={1} md={1} />
          <Col xs={10} md={10}>{children}</Col>
          <Col xs={1} md={1} />
        </Row>
      </Grid>
    )
  }
}

export default CenterLayout
