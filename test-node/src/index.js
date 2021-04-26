const puertoSerie = require('serialport');
const fs = require('fs');

verPuertos();

/* puertoSerie.list().then(
ports => ports.forEach( el => console.log(el)),
err => console.log(err)
);
 */

async function verPuertos(){
    const listaPuertos = await puertoSerie.list();
    console.log(listaPuertos);
}

/* const puerto = new puertoSerie("COM8", {
    baudRate: 115200,
    dataBits: 8,
    parity: none,
    stopBits : 1,
});
 */
//puerto.open();

/* puerto.on('readable', function () {
    console.log('Data:', puerto.read())
  }); */

//puerto.write()

/* for (var o=0;o<100;o++){
    console.log(puerto.read());
}
 */
//puerto.close();