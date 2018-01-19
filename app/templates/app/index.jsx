import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import './static/styles/app.less'

import configureStore from './store/configureStore'
import Router from './Router'

const store = configureStore(window.STATE_FROM_SERVER || {})

render(
  <Provider store={store}>
    {Router()}
  </Provider>,
  document.querySelector('.main'),
)
