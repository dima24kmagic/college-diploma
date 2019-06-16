const SerialPort = require('serialport/lib')

function getSerialPort() {
  return new Promise((res, rej) => {
    SerialPort.list((err, results) => {
      if (err) {
        rej(err)
      }
      results.forEach(port => {
        const { comName: portName } = port
        if (portName.includes('USB')) {
          res(portName)
        }
      })
      rej(new Error('No plugged usb module detected'))
    })
  })
}

module.exports = {
  getSerialPort,
}
