const Sequelize = require("sequelize");
const sequelize=new Sequelize(process.env.DATABASE_URL ||'postgres://postgres:baolerop@localhost:5432/ltweb2');
module.exports = sequelize;