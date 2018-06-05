var close = require('./common.js').close;
var handleError = require('./common.js').handleError;
var gsmClient = require('./common.js').gsmClient;

gsmClient.start().then(function() {
    gsmClient.sms.read(3).then(function(res) {
        console.log(res);
        console.log('Read SMS done!');
        close();
    }).catch(handleError);
}).catch(handleError);