import './app.scss'

import React, { Component } from 'react'
import WithTheme from './components/WithTheme'
import Home from './screens/Home'

class App extends Component {
  render() {
    return (
      <WithTheme>
        <Home />
      </WithTheme>
    )
  }
}

export default App
