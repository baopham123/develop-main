const Sequelize = require("sequelize");

const db = require("./dbconnect");

const film = db.define('film', {
  
    filmName:{
        type: Sequelize.STRING,
        allowNull: false
    },
  
    DateShow: {
        type: Sequelize.DATEONLY,
        allowNull:false
    },
  
    poster: {
        type: Sequelize.STRING,
        allowNull: false
    },
  
    time: {
        type: Sequelize.STRING,
        allowNull: false
    },
  
    Description: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },
    Trailer:{
        type: Sequelize.STRING(1000),
        allowNull: true
    }
  });

module.exports = film;
