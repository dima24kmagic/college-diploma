const { getSerialPort } = require('./utils/getSerialPort')
const SerialPort = require('serialport')
const io = require('socket.io')()

const SOCKET_PORT = 8080

const VALUE_WITHOUT_RESISTOR = 3968
const getPercentage = lightData => {
  return Math.floor(100 - lightData / (VALUE_WITHOUT_RESISTOR / 100))
}

function getLuxValue(rawData) {
  // max lux should be 500, max value is 3968, 3968/5 ~ 8
  console.log({ rawData })
  return Math.floor((VALUE_WITHOUT_RESISTOR - rawData) / 8)
}

/**
 * Main func
 */
async function main() {
  try {
    const pluggedModulePort = await getSerialPort()
    const port = new SerialPort(pluggedModulePort) // вот тут надо имя порта e.x. "/dev/ttyUSB0"

    // Эта функция принимает данные, которые отправляются с помощью Serial.print(<someData>)
    port.on('data', data => {
      const rawData = data.toString()
      const percentageData = getPercentage(rawData)
      const luxData = getLuxValue(rawData)
      // отправляю через вебсокет данные которые пришли из Serial.print()
      io.emit('data', { rawData, percentageData, luxData })
    })
  } catch (e) {
    console.log(e.message)
  }

  io.listen(SOCKET_PORT)
}

module.exports = main
