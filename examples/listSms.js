var close = require('./common.js').close;
var handleError = require('./common.js').handleError;
var gsmClient = require('./common.js').gsmClient;

gsmClient.start().then(function() {
    gsmClient.sms.list('ALL').then(function(res) {
        console.log(res);
        console.log('List SMS done!');
        close();
    }).catch(handleError);
}).catch(handleError);