var db = require('./db');

function getAllPosts(res) {
  db.qq['query']('SELECT id, title, date, content FROM postz ORDER BY id DESC', [], function(err, result) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    // k im just gonna spit out the array itself. fuck views.
    res.write(JSON.stringify(result.rows));
    res.end();
  });
}

function editPost(res, data) {
  var data = JSON.parse(data);
  var fieldsArray = [data.id];
  var fieldsToUpdate = "";
  if (data.title) {
    fieldsArray.push(data.title);
    fieldsToUpdate += ("title = $" + fieldsArray.length + " ");
    if (data.content) { fieldsToUpdate += ", "; } // EWWWWW
  }
  if (data.content) {
    fieldsArray.push(data.content);
    fieldsToUpdate += ("content = $" + fieldsArray.length + " ");
  }
  
  db.qq['query']('UPDATE postz SET ' + fieldsToUpdate + 'WHERE id = $1 RETURNING *', fieldsArray, function(err, result) {
    //console.log("successfully updated post#" + data.id);
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write(JSON.stringify(result.rows));
    res.end();
  });
}

function submitPost(res, data) {
  var data = JSON.parse(data);
  db.qq['query']('INSERT INTO postz (title, content) VALUES ($1, $2) RETURNING *', [data.title, data.content], function(err, result) {
    //console.log("successfully created post");
    res.writeHead(201, {"Content-Type": "text/plain"});
    res.write(JSON.stringify(result.rows));
    res.end();
  });
}

function removePost(res, data) {
  var data = JSON.parse(data);
  db.qq['query']('DELETE FROM postz WHERE id = $1', [data.id], function(err, result) {
    //console.log("successfully deleted post#" + data.id);
    res.writeHead(204, {"Content-Type": "text/plain"});
    res.end();
  });
}

exports.getAllPosts = getAllPosts;
exports.submitPost = submitPost;
exports.editPost = editPost;
exports.removePost = removePost;
