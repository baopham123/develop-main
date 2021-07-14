const Sequelize = require("sequelize");

const db = require("./dbconnect");

const Users = db.define("profile", {
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },

  profileName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  phone: {
    type: Sequelize.STRING,
    allowNull: true
  },

  permission: 
  {
    //0: user
    //1: admin
    type: Sequelize.STRING,
    allowNull:false
  },

  
  status: {
    //true: verified
    //false: not verify yet
    type: Sequelize.BOOLEAN,
    allowNull: false
  }

});

module.exports = Users;
