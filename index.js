var server = require('./server');
var router = require('./router');

server.serve(router.route);
