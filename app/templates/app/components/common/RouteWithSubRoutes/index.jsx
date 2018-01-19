// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
// https://reacttraining.com/react-router/web/example/route-config

import React from 'react'
import { Route } from 'react-router-dom'

export default function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  )
}
