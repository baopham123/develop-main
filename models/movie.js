const Sequelize = require("sequelize");

const db = require("./dbconnect");

const movie = db.define('movie', {
  
    filmID:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
  
    cinemaID: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
  
    DateStart: {
        type: Sequelize.DATE,
        allowNull: false
    },
  
    DateEnd: {
        type: Sequelize.DATE,
        allowNull: false
    },
  
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
  });

module.exports = movie;
