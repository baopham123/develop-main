const Sequelize = require("sequelize");

const db = require("./dbconnect");

const cinemaGroup = db.define("cinemaGroup", {
  cinemagroupName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Address: {
    type: Sequelize.STRING,
    allowNull: false
  }

});

module.exports = cinemaGroup;
