import React from 'react'
import './LightData.scss'

const propTypes = {}
const defaultProps = {
  scale: 'Люкс',
}

/**
 * Light data
 */
export function LightData({ amount, scale }) {
  return (
    <div className="data">
      <span className="ws-data">{amount}</span>
      <span className="scale">{scale}</span>
    </div>
  )
}

LightData.propTypes = propTypes
LightData.defaultProps = defaultProps

export default LightData
