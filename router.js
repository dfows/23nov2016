var handleReq = require('./reqHandlers');

function route(pathname, res, method, data) {
  if (pathname === "/") {
    handleReq.getAllPosts(res);
  } else if (pathname.search(/^\/posts/) != -1) {
    // stupid and ugly but whatever let's get this working
    if (pathname.search(/\d+/) != -1) {
      var id = pathname.match(/\d+/)[0]; // this is already a string
      if (method === 'PATCH') {
        // lol..........
        var editData = JSON.parse(data);
        editData.id = id;
        handleReq.editPost(res, JSON.stringify(editData));
      } else if (method === 'DELETE') {
        handleReq.removePost(res, JSON.stringify({id: id}));
      } else {
        errorOut(res);
      }
    } else {
      if (method === 'GET') {
        handleReq.getAllPosts(res);
      } else if (method === 'POST') {
        handleReq.submitPost(res, data);
      } else {
        errorOut(res);
      }
    }
  } else {
    errorOut(res);
  }
  // yeah i know there's a better way to branch this buttttttt this is terrible anyway so idgaf

  // whoa never done this before it feels weird
  function errorOut(res) {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("404 not found bruh");
    res.end();
  }
}

exports.route = route;
