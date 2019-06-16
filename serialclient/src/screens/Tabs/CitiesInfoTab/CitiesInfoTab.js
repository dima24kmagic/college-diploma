import React, { Component } from 'react'
import axios from 'axios'
import './CitiesInfoTab.scss'
import LightData from '../../../components/LightData/LightData'
import { ClickAwayListener, Popper } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Grow from '@material-ui/core/Grow'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

const propTypes = {}
const defaultProps = {}

// Clouds could be from 0 to 100
// Sunset/Sunrise
//

// 0 clouds + 12-18 p.m = 900 lux
// 100 clouds + 12-18 p.m. = 100 lux
// 1 cloud percent = 900-100/100 = -80 lux
// night time = 10 lux

const API_KEY = 'dd28a6527ddc8d360a74895e4911a093'

async function getCityLuxData(cityToShow) {
  return await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityToShow}&APPID=${API_KEY}`,
  )
}

const cities = [
  { en: 'Minsk', ru: 'Минск' },
  { en: 'Hrodna', ru: 'Гродно' },
  { en: 'Homyel', ru: 'Гомель' },
  { en: 'Brest', ru: 'Брест' },
  { en: 'Vitebsk', ru: 'Витебск' },
  { en: 'Mahilyow', ru: 'Могилёв' },
]

function getMaxLuxBasedOnTime() {
  const currentHours = new Date().getHours()
  if (currentHours < 5 || currentHours > 22) {
    return 100
  }
  if (currentHours === 21) {
    return 500
  }
  return 1000
}

/**
 * Tab with API cities info
 */
export class CitiesInfoTab extends Component {
  constructor() {
    super()
    this.MAX_LUX_AT_DAY = getMaxLuxBasedOnTime()
    this.citiesChooserRef = React.createRef()
  }
  state = {
    cityToShow: cities[0],
    cityLuxData: 0,
    isCityMenuOpen: false,
  }
  async componentDidMount() {
    const cityName = this.state.cityToShow.en
    const cityLuxData = await this.getLuxData(cityName)
    this.setState({ cityLuxData })
  }

  getLuxData = async cityName => {
    const { data } = await getCityLuxData(cityName)
    console.log({ data })
    const {
      clouds: { all: cloudsPercentage },
    } = data
    const amountOfLightnessTakenByClouds = cloudsPercentage * 8
    const cityLuxData = this.MAX_LUX_AT_DAY - amountOfLightnessTakenByClouds
    return cityLuxData
  }

  openCitiesChooser = () => {
    this.setState({
      isCityMenuOpen: true,
    })
  }

  closeCitiesChooser = () => {
    this.setState({
      isCityMenuOpen: false,
    })
  }

  chooseCityToShow = async city => {
    const cityName = city.en
    const cityLuxData = await this.getLuxData(cityName)
    this.setState({
      cityToShow: city,
      cityLuxData,
    })
    this.closeCitiesChooser()
  }

  render() {
    const { cityLuxData, isCityMenuOpen, cityToShow } = this.state
    return (
      <div className="city-light">
        <div className="current-light">
          Текущая освещённость в городе{' '}
          <span ref={this.citiesChooserRef} onClick={this.openCitiesChooser}>
            {cityToShow.ru}
          </span>
        </div>
        <LightData amount={cityLuxData} />
        <Popper
          disablePortal
          transition
          open={isCityMenuOpen}
          anchorEl={this.citiesChooserRef.current}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: 'center top',
              }}
            >
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={this.closeCitiesChooser}>
                  <MenuList>
                    {cities.map(city => {
                      const handleChoseCityToShow = () => {
                        this.chooseCityToShow(city)
                      }
                      const isSelected = cityToShow === city
                      return (
                        <MenuItem
                          selected={isSelected}
                          onClick={handleChoseCityToShow}
                        >
                          {city.ru}
                        </MenuItem>
                      )
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    )
  }
}

CitiesInfoTab.propTypes = propTypes
CitiesInfoTab.defaultProps = defaultProps

export default CitiesInfoTab
