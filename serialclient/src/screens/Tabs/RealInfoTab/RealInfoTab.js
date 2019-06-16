import './RealInfoTab.scss';

import { Typography } from '@material-ui/core';
import React, { Component } from 'react';
import openSocket from 'socket.io-client';

import LightData from '../../../components/LightData/LightData';

const propTypes = {}
const defaultProps = {}

const client = openSocket('http://localhost:8080')

/**
 * Tab with info from Arduino serial port
 */
export class RealInfoTab extends Component {
  state = {
    percentageData: 150,
    rawData: 0,
    luxData: 150,
    currentView: 'luxData',
    error: null,
  }

  componentDidMount() {
    client.on('data', ({ rawData, percentageData, luxData }) => {
      this.setState({ percentageData, rawData, luxData })
    })
    client.on('connect_error', () => {
      this.setState({
        error: 'Подключите устройство ардуино',
      })
    })
    client.on('connect', () => {
      this.setState({ error: null })
    })
  }

  toggleView = () => {
    this.setState({
      currentView:
        this.state.currentView === 'percentageData'
          ? 'luxData'
          : 'percentageData',
    })
  }
  render() {
    const { currentView } = this.state
    const amount = this.state[currentView]
    const scale = currentView === 'percentageData' ? '%' : ' Люкс'
    const scaleName = currentView === 'percentageData' ? 'люкс' : 'проценты'
    return (
      <div
        className="real-data"
        onClick={this.toggleView}
        title={`Перевести в ${scaleName}`}
      >
        <Typography className="current-light">Текущая освещённость</Typography>
        <LightData amount={amount} scale={scale} />
      </div>
    )
  }
}

RealInfoTab.propTypes = propTypes
RealInfoTab.defaultProps = defaultProps

export default RealInfoTab
