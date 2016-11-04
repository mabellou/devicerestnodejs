
var connection = require('../connection');

function User(attributes) {
  var self = this;
  Object.keys(attributes).forEach(function(key){
    self[key] = attributes[key];
  });
};

User.findAll = function(callback) {
    connection.acquire(function(err, con) {
    con.query('select * from user, user_profile, (Select ub.userid, ub.badgeid From user_badge ub Inner Join (Select userid,max(startdate) as startdate From user_badge Group By userid) ub2 On ub.userid = ub2.userid And ub.startdate = ub2.startdate) user_last_badge where user.id = user_last_badge.userid and user_profile.id = user.profileid', function(err, rows) {
      if (err) { return callback(err, rows); }
      var users = rows.map(function (row) {
        return new User(row);
      });
      callback(null, users);
      con.release();
    });
  });  
};

User.findByBadge = function(badgeId, callback) {
  connection.acquire(function(err, con) {
    con.query('select * from user, user_badge where user.id = user_badge.userid and user_badge.badgeid = ? and (user.enddate is null or user.enddate > NOW()) ORDER by user_badge.startdate desc limit 1', [badgeId], function(err, rows) {
      if (err) { return callback(err); }
      con.release();
      var newUser = null;
      if (rows[0])
        newUser = new User(rows[0]);
      callback(null, newUser);
    });
  });  
};

module.exports = User;