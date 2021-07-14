const Sequelize = require("sequelize");

const db = require("./dbconnect");

const verifyCode = db.define("Verify", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  verifyCode: {
    type: Sequelize.STRING,
    allowNull: false
  },

  case: {
    // 0: for register
    // 1: for forget-password 
    // 2: change-password
    type: Sequelize.INTEGER,
    allowNull: false
  },

  isUsed: {
    // true: used
    // false: unused
    type: Sequelize.BOOLEAN,
    allowNull: false
  }

});

module.exports = verifyCode;
