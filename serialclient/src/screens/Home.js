import React, { Component } from 'react'
import './Home.scss'
import RealInfoTab from './Tabs/RealInfoTab/RealInfoTab'
import { Typography } from '@material-ui/core'
import CitiesInfoTab from './Tabs/CitiesInfoTab'
import Norms from '../components/Norms'

const propTypes = {}
const defaultProps = {}

/**
 * Home screen
 */
export class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home__data">
          <Typography className="diploma-name">
            Измеритель уровня освещённости на платформе Arduino
          </Typography>
          <div className="data-tabs">
            <div className="tab">
              <RealInfoTab />
            </div>
            <div className="tab">
              <CitiesInfoTab />
            </div>
          </div>
          <Norms />
        </div>
        <div className="creator-name">Выполнил Баранов Дмитрий. 2019 год</div>
      </div>
    )
  }
}

Home.propTypes = propTypes
Home.defaultProps = defaultProps

export default Home
