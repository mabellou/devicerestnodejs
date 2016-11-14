
var connection = require('../connection');
var Profile = require('../models/profile');
var jwt = require('jsonwebtoken');

function User(attributes) {
  var self = this;
  Object.keys(attributes).forEach(function(key){
    self[key] = attributes[key];
  });
};

User.findAll = function(callback) {
    connection.acquire(function(err, con) {
    con.query('select * from user left join (Select ub.userid, ub.badgeid From user_badge ub Inner Join (Select userid,max(startdate) as startdate From user_badge Group By userid) ub2 On ub.userid = ub2.userid And ub.startdate = ub2.startdate) user_last_badge on user.id = user_last_badge.userid where (user.enddate is null or user.enddate > NOW())', function(err, rows) {
      if (err) { return callback(err, rows); }
      var users = rows.map(function (row) {
        return new User(row);
      });
      callback(null, users);
      con.release();
    });
  });  
};

User.create = function(user, callback) {
  connection.acquire(function(err, con) {
    console.log("user --> " , user);
    console.log("user --> " , Profile.findIdByProfile(user.profile));
    con.query('INSERT INTO user (username, firstname, lastname, profileid, startdate, enddate, password) VALUES (?, ?, ?, ?, NOW(), null, ?)', [user.username, user.firstname, user.lastname, Profile.findIdByProfile(user.profile), user.password], function(err) {
      if (err) { return callback(err); }
      con.release();
      callback();
    });
  });  
};

User.findByBadge = function(badgeId, callback) {
  connection.acquire(function(err, con) {
    con.query('select * from user left join (Select ub.userid, ub.badgeid From user_badge ub Inner Join (Select userid,max(startdate) as startdate From user_badge Group By userid) ub2 On ub.userid = ub2.userid And ub.startdate = ub2.startdate) user_last_badge on user.id = user_last_badge.userid where user.badgeid = ? and (user.enddate is null or user.enddate > NOW())', [badgeId], function(err, rows) {
      if (err) { return callback(err); }
      con.release();
      var showedUser = null;
      if (rows[0])
        showedUser = new User(rows[0]);
      callback(null, showedUser);
    });
  });  
};

User.findByUsername = function(userName, callback) {
  connection.acquire(function(err, con) {
    con.query('select * from user where username = ? limit 1', [userName], function(err, rows) {
      if (err) { return callback(err); }
      con.release();
      var showedUser = null;
      if (rows[0])
        showedUser = new User(rows[0]);
      callback(null, showedUser);
    });
  });  
};

User.findById = function(userId, callback) {
  connection.acquire(function(err, con) {
    con.query('select * from user where id = ? limit 1', [userId], function(err, rows) {
      if (err) { return callback(err); }
      con.release();
      var showedUser = null;
      if (rows[0])
        showedUser = new User(rows[0]);
      callback(null, showedUser);
    });
  });  
};

User.verifyPassword = function(password, user, callback) {
  if (password != user.password) {
    callback(null, null);
  }  
  callback(null, user);
};

User.createJwtToken = function(user, callback) {
  var payload = {
    id: user.id,
    username: user.username,
    profile: Profile.findProfileById(user.profileid)
  };
  var token = jwt.sign(payload, 'thisistoomuchsecure', {
    expiresIn : 60*60*12 // expires in 24 hours
  }, callback);

};

module.exports = User;


