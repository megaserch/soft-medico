const puertoSerie = require('serialport');
const Readline = require('@serialport/parser-readline')
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

     /*  for (var i=0;i<100;i++){
          console.log(port.read());
      } */
    // open logic
  })

  // Read data that is available but keep the stream in "paused mode"
port.on('readable', function () {
    console.log('Data:', port.read())
  })
  
  // Switches the port into "flowing mode"
  port.on('data', function (data) {
    console.log('Data:', data)
  })
  
  // Pipe the data into another stream (like a parser or standard out)
  const lineStream = port.pipe(new Readline())