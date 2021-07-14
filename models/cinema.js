const Sequelize = require("sequelize");

const db = require("./dbconnect");

const Users = db.define("cinema", {
  cinemaName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cinemagroupID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  cinemaType: {
    type: Sequelize.STRING,
    allowNull: false
  },

  length: {
    type: Sequelize.STRING,
    allowNull: true
  },

  width: 
  {
    //0: user
    //1: admin
    type: Sequelize.STRING,
    allowNull:false
  }

});

module.exports = Users;
