import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom'

import RouteWithSubRoutes from './components/common/RouteWithSubRoutes'
import Bundle from './components/common/Bundle'

import NotFound from './routes/NotFound'

const Counter = props => (
  <Bundle load={cb => require.async('./routes/Counter', mod => cb(mod))}>
    {Comp => <Comp {...props} />}
  </Bundle>
)

const RedirectTo404 = () => <Redirect to="/404" />

export default () => {
  const routesConfig = [
    {
      key: '/',
      path: '/',
      component: () => (
        <div>
          <p>Index</p>
          <p><a href="#/counter">Counter</a></p>
        </div>
      ),
      exact: true,
    },
    {
      key: '/counter',
      path: '/counter',
      component: Counter,
      routes: [
        {
          key: '404',
          component: RedirectTo404,
        },
      ],
    },
    {
      key: '404',
      component: NotFound,
    },
  ]

  return (
    <Router>
      <Switch>
        {routesConfig.map(conf => (
          <RouteWithSubRoutes {...conf} />
        ))}
      </Switch>
    </Router>
  )
}