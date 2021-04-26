const puertoSerie = require('serialport');

const puerto = new puertoSerie("COM8", {
    baudRate: 115200,
/*     dataBits: 8,
    parity: none,
    stopBits : 1,
 */});

puerto.open();

/* puerto.on('readable', function () {
    console.log('Data:', puerto.read())
  }); */

for (var o=0;o<100;o++){
    console.log(puerto.read());
}

puerto.close();