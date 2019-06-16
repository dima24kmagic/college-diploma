import React from 'react'
import { create } from 'jss'
import { jssPreset, StylesProvider, ThemeProvider } from '@material-ui/styles'
import { node, shape } from 'prop-types'
import theme from '../../theme/'

const propTypes = {
  children: node.isRequired,
}

const defaultProps = {}

const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: document.getElementById('jss-insertion-point'),
})

/**
 * Component to provide theme from redux
 */
export function WithTheme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>{children}</StylesProvider>
    </ThemeProvider>
  )
}

WithTheme.propTypes = propTypes
WithTheme.defaultProps = defaultProps

export default WithTheme
