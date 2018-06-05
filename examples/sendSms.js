var close = require('./common.js').close;
var handleError = require('./common.js').handleError;
var gsmClient = require('./common.js').gsmClient;

gsmClient.start().then(function() {
    gsmClient.on('sms_sended', function(res) {
        console.log('SMS sended: ' + res.index);
        close();
    });

    gsmClient.sms.sendSms('+526449975249', 'No hay Saldo').then(function(res) {
        console.log('Send SMS done!');
    }).catch(handleError);
}).catch(handleError);