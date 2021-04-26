const puertoSerie = require('serialport');
const fs = require('fs');

/* verPuertos();

async function verPuertos(){
    const listaPuertos = await puertoSerie.list();
    console.log(listaPuertos);
}
 */


/* puertoSerie.list().then(
ports => ports.forEach( el => console.log(el)),
err => console.log(err)
);
 */



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
  
    // Because there's no callback to write, write errors will be emitted on the port:
    port.write('main screen turn on');
  })
  
  // The open event is always emitted
  port.on('open', function() {
      console.log('puerto abierto');
    // open logic
  })