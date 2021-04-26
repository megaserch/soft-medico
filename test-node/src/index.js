const express = require('express');

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

const app = express();

app.set('port', 4321);

app.listen( 4321, "0.0.0.0", () => {
    console.log('Server iniciado...');
})



app.get('/events', async function(req, res) {
    console.log('Got /events');
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive'
    });
    res.flushHeaders();

    // Tell the client to retry every 10 seconds if connectivity is lost
    res.write('retry: 10000\n\n');
    let count = 0;

    const parser = port.pipe(new Readline({ delimiter: '\r\n' }))

    while (true) {
      await new Promise(resolve => setTimeout(resolve, 1));
      
      parser.on('data', res.write)
      //console.log('Emit', ++count);
      // Emit an SSE that contains the current 'count' as a string
      //res.write(`data: ${count}\n\n`);
    }
  });