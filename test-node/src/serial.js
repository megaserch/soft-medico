const puertoSerie = require('serialport');
const Readline = require('@serialport/parser-readline')

const port = new puertoSerie("COM8", {
    baudRate: 115200,
/*     dataBits: 8,
    parity: none,
    stopBits : 1,
 */    autoOpen: false,
});
 
port.open(function (err) {
    if (err) {
      return console.log('Error opening port: ', err.message);
    }
  
    port.write('main screen turn on');
  })
  
  port.on('open', function() {
      console.log('puerto abierto');
  })

  /* port.on('data', function (data) {
    console.log('Data data:', data)
  }) 
   */
  // Pipe the data into another stream (like a parser or standard out)
  //const lineStream = port.pipe(new Readline())

const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', console.log)
