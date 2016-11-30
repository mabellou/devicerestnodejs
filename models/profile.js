var connection = require('../connection');

function Profile() {
};

Profile.findProfileById = function(profileid) {
  // Change by a call to the DB
  if (profileid == 1)
    return "administrator"
  if (profileid == 2)
    return "incubator"
  if (profileid == 3)
    return "business"
  if (profileid == 4)
    return "tester"
  if (profileid == 5)
    return "savi"
};

Profile.findIdByProfile = function(profile) {
  // Change by a call to the DB
  if (profile == "administrator")
    return 1
  if (profile == "incubator")
    return 2
  if (profile == "business")
    return 3
  if (profile == "tester")
    return 4
  if (profile == "savi")
    return 5
};

module.exports = Profile;