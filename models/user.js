
var connection = require('../connection');
var Profile = require('../models/profile');
var jwt = require('jsonwebtoken');
var moment = require('moment');

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

    if (user.enddate && moment(user.enddate, "DD/MM/YYYY").isValid())
      user.enddate = moment(user.enddate, 'DD/MM/YYYY').format("YYYY-MM-DD");
    else
      user.enddate = null;

    con.query('INSERT INTO user (username, firstname, lastname, profileid, startdate, enddate, password) VALUES (?, ?, ?, ?, NOW(), ?, ?)', [user.username, user.firstname, user.lastname, Profile.findIdByProfile(user.profile), user.enddate, user.password], function(err, rows) {
      if (err) { 
        if(err.errno == 1062)
          return callback({ internErrorCode: 11, text: 'The user already exists'}); 
        return callback(err); 
      }
      if(rows && rows.insertId)
        user.userid = rows.insertId;
      else
        callback({ internErrorCode: 1, text: 'No id for the user was received'})

      con.release();
      callback();
    });
  });  
};

User.update = function(user, userid, callback) {
  connection.acquire(function(err, con) {

    if (user.enddate && moment(user.enddate, "DD/MM/YYYY").isValid())
      user.enddate = moment(user.enddate, 'DD/MM/YYYY').format("YYYY-MM-DD");
    else
      user.enddate = null;

    var queryUpdate = "UPDATE user SET ";
    var dataUpdate = [];

    if(user.username){
      queryUpdate = queryUpdate + "username = ?, ";
      dataUpdate.push(user.username);
    }
    if(user.password){
      queryUpdate = queryUpdate + "password = ?, ";
      dataUpdate.push(user.password);
    }
    if(user.firstname){
      queryUpdate = queryUpdate + "firstname = ?, ";
      dataUpdate.push(user.firstname);
    }
    if(user.lastname){
      queryUpdate = queryUpdate + "lastname = ?, ";
      dataUpdate.push(user.lastname);
    }
    if(user.profile){
      queryUpdate = queryUpdate + "profileid = ?, ";
      dataUpdate.push(Profile.findIdByProfile(user.profile));
    }
    
    queryUpdate = queryUpdate + "enddate = ? " + "WHERE id = ?";
    dataUpdate.push(user.enddate);
    dataUpdate.push(userid);

    console.log("The queryUpdate: ", queryUpdate);
    console.log("The dataUpdate: ", dataUpdate);

    con.query(queryUpdate, dataUpdate, function(err, rows) {
      if (err) { 
        return callback(err); 
      }
      user.userid = userid;

      con.release();
      callback();
    });
  });  
};

User.createBadge = function(user, callback) {
  connection.acquire(function(err, con) {
    con.query('INSERT INTO user_badge (userid, badgeid, startdate) VALUES (?, ?, NOW())', [user.userid, user.badgeid], function(err) {
      if (err) { 
        return callback(err); 
      }
      con.release();
      callback();
    });
  });  
};

User.findByBadge = function(badgeId, callback) {
  connection.acquire(function(err, con) {
    con.query('select * from user left join (Select ub.userid, ub.badgeid From user_badge ub Inner Join (Select userid,max(startdate) as startdate From user_badge Group By userid) ub2 On ub.userid = ub2.userid And ub.startdate = ub2.startdate) user_last_badge on user.id = user_last_badge.userid where user_last_badge.badgeid = ? and (user.enddate is null or user.enddate > NOW())', [badgeId], function(err, rows) {
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
    con.query('select * from user where username = ? and (user.enddate is null or user.enddate > NOW()) limit 1', [userName], function(err, rows) {
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
    con.query('select * from user where id = ? and (user.enddate is null or user.enddate > NOW()) limit 1', [userId], function(err, rows) {
      if (err) { return callback(err); }
      con.release();
      if (rows[0])
        return callback(null, new User(rows[0]));
      callback({ internErrorCode: 9, text: 'The user does not exist'}, null);
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


