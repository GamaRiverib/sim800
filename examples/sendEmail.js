var close = require('./common.js').close;
var handleError = require('./common.js').handleError;
var gsmClient = require('./common.js').gsmClient;

var smtp = {
    host: 'smtp.gmail.com',
    port: 465, // 587
    user: 'test@gmail.com',
    pass: '...'
};

gsmClient.start().then(function() {
    setTimeout(function() {
        var from = { email: 'tes@gmail.com' };
        var to = { email: 'test@gmail.com' };
        gsmClient.email.sendEmail(smtp, from, to, 'Sim800 Email Test', 'Hello Friend!!!')
            .then(function(res) {
                console.log(res);
                setTimeout(close, 20000);
            }).catch(handleError);
    }, 2000);
}).catch(handleError);