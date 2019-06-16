import React, { Component } from 'react'
import Button from '../Button'
import { Dialog } from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import CloseIcon from '@material-ui/icons/Close'
import './Norms.scss'

const propTypes = {}
const defaultProps = {}

function createNorm(name, value) {
  return [name, value]
}

/**
 * Norms of light
 */
export class Norms extends Component {
  constructor() {
    super()
    this.norms = [
      createNorm(
        'Жилые комнаты, гостиные, спальни, жилые комнаты общежитий',
        150,
      ),
      createNorm('Кухни, кухни-столовые, кухни-ниши', 150),
      createNorm('Детские', 200),
      createNorm('Кабинеты, библиотеки', 300),
      createNorm('Внутриквартирные коридоры, холлы', 50),
      createNorm('Кладовые, подсобные', 300),
      createNorm('Гардеробные', 75),
      createNorm('Сауна, раздевалки, бассейн', 100),
      createNorm('Тренажерный зал', 150),
      createNorm('Биллиардная', 300),
      createNorm('Ванные комнаты, уборные, санузлы, душевые', 50),
      createNorm('Помещение консьержа', 150),
      createNorm('Лестницы', 20),
      createNorm(
        'Поэтажные внеквартирные коридоры, вестибюли, лифтовые холлы',
        30,
      ),
      createNorm('Колясочные, велосипедные', 30),
      createNorm(
        'Тепловые пункты, насосные, электрощитовые, машинные помещения лифтов, венткамеры',
        20,
      ),
      createNorm(
        'Основные проходы технических этажей, подполий, подвалов, чердаков',
        20,
      ),
      createNorm('Шахты лифтов', 5),
    ]
  }
  state = {
    modalOpen: false,
  }
  toggleDialog = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    })
  }
  render() {
    const { modalOpen } = this.state
    return (
      <div className="norms">
        <Button onClick={this.toggleDialog}>Показать нормы</Button>
        <Dialog open={modalOpen} onClose={this.toggleDialog}>
          <div className="norms__dialog">
            <DialogTitle id="alert-dialog-title">Нормы освещения</DialogTitle>
            <DialogContent>
              {this.norms.map(norm => {
                const [name, value] = norm
                return (
                  <div key={name} className="norms__value">
                    <div className="name">{name}</div>
                    <div className="value">{value}</div>
                  </div>
                )
              })}
            </DialogContent>
            <Button onClick={this.toggleDialog}>
              <CloseIcon />
            </Button>
          </div>
        </Dialog>
      </div>
    )
  }
}

Norms.propTypes = propTypes
Norms.defaultProps = defaultProps

export default Norms
