var close = require('./common.js').close;
var handleError = require('./common.js').handleError;
var gsmClient = require('./common.js').gsmClient;

gsmClient.start().then(function() {
    console.log('GsmClient open success!');
    gsmClient.on('ussd', function(args) {
        console.log(args);
        close();
    });

    gsmClient.sms.sendUssd('*133#')
        .then(function() {
            console.log('Sended ussd');
        }).catch(handleError);

}).catch(handleError);