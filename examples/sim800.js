var close = require('./common.js').close;
var handleError = require('./common.js').handleError;
var gsmClient = require('./common.js').gsmClient;

gsmClient.start().then(function() {
    console.log('GsmClient open success!');
    gsmClient.getInfo()
        .then(function(info) {
            console.log(info);
            close();
        }).catch(handleError);

}).catch(handleError);