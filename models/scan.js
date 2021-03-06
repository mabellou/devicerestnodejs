
var connection = require('../connection');

function Scan() {
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

Scan.findActiveUserId = function(callback) {
  connection.acquire(function(err, con) {
    con.query('select entityid from scan where type = "user" and date > DATE_SUB(NOW(), INTERVAL ? SECOND) order by date desc limit 1', [20], function(err, rows) {
      if (err) { return callback(err); }
      con.release();
      var userId = null;
      if (rows[0]) 
        userId = rows[0].entityid;
      callback(null, userId);
    });
  });  
};

module.exports = Scan;