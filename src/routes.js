import React from 'react'
import { Route } from 'react-router-dom'
import { Router } from 'react-router'
import createHistory from 'history/createBrowserHistory'

// Layout
import MainLayout from './layouts/MainLayout'

// Containers
import InvoicesContainer from './containers/InvoicesContainer'
import ProductsContainer from './containers/ProductsContainer'
import CustomersContainer from './containers/CustomersContainer'

const history = createHistory()

export default (
  <Router history={history}>
    <div>
      <MainLayout>
        <Route exact path='/' component={InvoicesContainer} />
        <Route exact path='/products' component={ProductsContainer} />
        <Route exact path='/customers' component={CustomersContainer} />
      </MainLayout>
    </div>
  </Router>
)
