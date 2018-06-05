var close = require('./common.js').close;
var handleError = require('./common.js').handleError;
var gsmClient = require('./common.js').gsmClient;

gsmClient.start().then(function() {
    gsmClient.sms.list('ALL').then(function(res) {
        gsmClient.sms.delete(res.length).then(function() {
            console.log('Delete SMS done!');
            close();
        }).catch(handleError);
        close();
    }).catch(handleError);
    
}).catch(handleError);