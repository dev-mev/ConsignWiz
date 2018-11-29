// users
module.exports = function (sequelize, DataTypes) {
  var logins = sequelize.define("logins", {
    passwordHash: DataTypes.STRING,
    passwordSalt: DataTypes.STRING
  }, {
    timestamps: false
  });
  return logins;
};

//   -- logins
// CREATE TABLE logins
// (
// 	id int NOT NULL AUTO_INCREMENT,
// 	related_user_id int NOT NULL,
//     password_hash varchar(300) NOT NULL, -- requires review
//     password_salt varchar(300) NOT NULL, -- requires review
// 	PRIMARY KEY (id)
//     -- FOREIGN KEY (related_user_id) REFERENCES memberships(related_user_id)
// );