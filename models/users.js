module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    username: {
        type: DataTypes.STRING,
        notNull: true
      },
    first_name: {
        type: DataTypes.STRING,
        notNull: true
      },
    last_name: {
        type: DataTypes.STRING,
        notNull: true
      },
    street_address1: {
        type: DataTypes.STRING,
        notNull: true
      },
    street_address2: DataTypes.STRING,
    city: {
        type: DataTypes.STRING,
        notNull: true
      },
    _state: {
        type: DataTypes.STRING,
        notNull: true
      },
    ZIP: {
        type: DataTypes.STRING,
        notNull: true
      },
    email_address: {
        type: DataTypes.STRING,
        notNull: true,
        isEmail: true,
      },
    phone1: {
        type: DataTypes.STRING,
        notNull: true
      },
    phone2: DataTypes.STRING
    }, {
        timestamps: false
    }
);

    users.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    users.hasOne(models.logins, {
      foreignKey: {
        allowNull: false
      }
    });
  };

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