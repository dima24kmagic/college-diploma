import React from 'react'
import { number } from 'prop-types'
import './ProgressBar.scss'

const propTypes = {
  progress: number
}
const defaultProps = {
  progress: 0
}

/**
 * Animated progress bar
 */
export function ProgressBar({ progress }) {
  return (
    <div className="bar">
      <div
        className="bar--content"
        style={{ transform: `translateX(${100 - progress}%)` }}
      />
    </div>
  )
}

ProgressBar.propTypes = propTypes
ProgressBar.defaultProps = defaultProps

export default ProgressBar
