import React, { Component } from 'react'
import { PropTypes as pt } from 'prop-types'
import Menu from '../../components/Menu'
import CenterLayout from '../CenterLayout'

class MainLayout extends Component {
  static propTypes = {
    children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)])
  }

  render() {
    const { children } = this.props
    return (
      <div className='main'>
        <header className='header'>
          <Menu />
        </header>
        <section className='section'>
          <CenterLayout>{children}</CenterLayout>
        </section>
      </div>
    )
  }
}

export default MainLayout
