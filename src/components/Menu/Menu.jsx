import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import CenterLayout from '../../layouts/CenterLayout'
import ListItemLink from '../ListItemLink'

class Menu extends Component {
  render() {
    return (
      <Navbar>
        <CenterLayout>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Invoice App</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <ListItemLink to='/'>Invoices</ListItemLink>
              <ListItemLink to='/products'>Products</ListItemLink>
              <ListItemLink to='/customers'>Customers</ListItemLink>
            </Nav>
          </Navbar.Collapse>
        </CenterLayout>
      </Navbar>
    )
  }
}

export default Menu
