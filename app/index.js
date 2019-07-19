import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader'
import RootView from './views/RootView'
import './app.global.css'

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer

render(
  <AppContainer>
    <RootView />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./views/RootView', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./views/RootView').default
    render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
