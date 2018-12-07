var Op = require("sequelize").Op;

// eslint didn't like [Op.like] so this is a work-around
module.exports = function(search) {
  return { [Op.like]: "%" + search  + "%" }
}