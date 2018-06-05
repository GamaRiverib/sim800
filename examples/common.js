var GenericGsmClient = require('../dist/GsmClient').GenericGsmClient;
var Modem = require('../dist/Modem').Modem;
var SerialPort = require('serialport');

var SERIAL_PORT = 'COM13';
var SERIAL_OPEN_OPTIONS = {
    autoOpen: false,
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1
};

var serialPort = new SerialPort(SERIAL_PORT, SERIAL_OPEN_OPTIONS);
var modem = new Modem(serialPort);

var gsmClient = new GenericGsmClient(modem);

function handleError(err) {
    console.log(err);
    gsmClient.end().then(function() {
        process.exit(1);
    }).catch(function(err) {
        console.log(err);
        process.exit(1);
    });
}

function close(timeout) {
    setTimeout(function() {
        gsmClient.end().then(function() {
            console.log('GsmClient closed!');
            process.exit(0);
        }).catch(handleError);
    }, timeout | 500);
}

module.exports = {
    gsmClient: gsmClient,
    handleError: handleError,
    close: close
};