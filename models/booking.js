const Sequelize = require("sequelize");

const db = require("./dbconnect");

const booking = db.define('booking', {
  
    profileID:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
  
    movieID: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
  
    DateCreate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
  
    Amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

module.exports = booking;
