var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/blogz';

var dbShit = {
  query: function(sqlStuff, values, callback) {
    pg.connect(connectionString, function(err, client, done) {
      client.query(sqlStuff, values, function(err, result) {
        done();
        callback(err, result);
      });
    });
  }
};

exports.qq = dbShit;
