
var connection = require('../connection');

function User() {
};

User.get = function(res) {
    connection.acquire(function(err, con) {
    con.query('select * from user', function(err, result) {
      //SELECT id, CONCAT(user.firstname,' ', user.lastname) AS fullname, firstname, lastname, startdate, enddate FROM user
      con.release();
      res.send(result);
    });
  });  
};

User.findByBadge = function(badgeId, callback) {
  connection.acquire(function(err, con) {
    con.query('select * from user, user_badge where user.id = user_badge.userid and user_badge.badgeid = ? and (user.enddate is null or user.enddate > NOW()) ORDER by user_badge.startdate desc limit 1', [badgeId], function(err, rows) {
      if (err) { return callback(err); }
      con.release();
      callback(null, rows[0]);
    });
  });  
};

module.exports = User;