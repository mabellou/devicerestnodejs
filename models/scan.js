
var connection = require('../connection');

function Scan() {
};

Scan.get = function(res) {
    connection.acquire(function(err, con) {
    con.query('select * from scan', function(err, result) {
      con.release();
      res.send(result);
    });
  });  
};

Scan.create = function(type, entity, callback) {
  connection.acquire(function(err, con) {
    con.query('insert into scan(entityid, type, badgeid, date) values (?,?,?,NOW())', [entity.id, type, entity.badgeid], function(err) {
      if (err) { return callback(err); }
      con.release();
      callback();
    });
  });  
};

module.exports = Scan;