const Sequelize = require("sequelize");

const db = require("./dbconnect");

const Users = db.define("ticket", {
  bookingID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  codeW: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  codeH: {
    type: Sequelize.STRING,
    allowNull: false
  },

  price: {
    type: Sequelize.DOUBLE,
    allowNull: true
  }

});

module.exports = Users;
