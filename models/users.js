module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    username: DataTypes.STRING,
    validation: { notNull: true, },
    first_name: DataTypes.STRING,
    validation: { notNull: true, },
    last_name: DataTypes.STRING,
    validation: { notNull: true, },
    street_address1: DataTypes.STRING,
    validation: { notNull: true, },
    street_address2: DataTypes.STRING,
    validation: { notNull: true, },
    city: DataTypes.STRING,
    validation: { notNull: true, },
    _state: DataTypes.STRING,
    validation: { notNull: true, },
    ZIP: DataTypes.STRING,
    validation: { notNull: true, },
    email_address: DataTypes.STRING,
    validation: {isEmail: true, 
    notNull: true },
    phone1: DataTypes.STRING,
    validation: { notNull: true, },
    phone2: DataTypes.STRING
    });
    return users;
  };

  /* 
  -- users
CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(300) NOT NULL,
    first_name varchar(300) NOT NULL, 
    last_name varchar(300) NOT NULL,
    street_address1 varchar(300) NOT NULL, 
    street_address2 varchar(300),
    city varchar(300) NOT NULL,
    _state varchar(300) NOT NULL,
    zip int NOT NULL,
    email_address varchar(300) NOT NULL,
    phone1 varchar(300) NOT NULL, 
    phone2 varchar(300),
	PRIMARY KEY (id)
);
  
  */