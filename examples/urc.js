var close = require('./common.js').close;
var handleError = require('./common.js').handleError;
var gsmClient = require('./common.js').gsmClient;

gsmClient.start().then(function() {
    console.log('GsmClient open success!');

    gsmClient.on(URC.RING.code, function(data) { 
        console.log('RING');
        console.log(data); 
    });

    gsmClient.on(URC.CMTI.code, function(data) { 
        console.log('CMTI');
        console.log(data); 
    });

    gsmClient.on(URC.CPIN.code, function(data) { 
        console.log('CPIN');
        console.log(data); 
    });
    close(60000);
}).catch(handleError);