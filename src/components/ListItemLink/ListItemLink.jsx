import React, { Component } from 'react';
import { PropTypes as pt } from 'prop-types'
import { Route, Link } from 'react-router-dom'

class ListItemLink extends Component {
  static propTypes = {
    children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
    to: pt.string
  }

  renderItem = () => (
    <li
      role='presentation'
    >
      <Link to={this.props.to}>{this.props.children}</Link>
    </li>
  )

  render() {
    const { to } = this.props
    return (
      <Route
        path={to}
        children={this.renderItem}
      />
    )
  }
}

export default ListItemLink
