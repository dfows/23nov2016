var http = require('http');
var url = require('url');

var port = process.env.PORT || 8888;

function serve(route) {
  http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    var postData = "";

    req.setEncoding("utf8");
    req.addListener("data", function(d) {
      postData += d;
    });
    req.addListener("end", function() {
      route(pathname, res, req.method, postData);
    });
  }).listen(port);
}

exports.serve = serve;
