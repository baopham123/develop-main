const Router = require('express-promise-router')
const router = new Router();
const Sequelize = require('sequelize')
const Cinema = require("../../models/cinema");
const booking = require("../../models/booking");
const film = require("../../models/film");
const bcrypt = require('bcryptjs');
const express = require('express');
const { STRING } = require('sequelize');
const app = express();
const sequelize=new Sequelize(process.env.DATABASE_URL ||'postgres://postgres:baolerop@localhost:5432/ltweb2');

router.get('/',async function(req,res){
  var profile= null;
    if(req.session.profile!=null)
    {
      profile=req.session.profile;
    }
  let perPage = 3; // số lượng sản phẩm xuất hiện trên 1 page
  let page = req.params.page || 1; 
  var film = await sequelize.query(`SELECT * FROM films limit ${perPage} OFFSET  ${(perPage * page) - perPage}`, { type:Sequelize.QueryTypes.SELECT}); 
  var count = await sequelize.query(`SELECT count(*) as dem FROM films`, { type:Sequelize.QueryTypes.SELECT});
  res.render('catalog1.ejs',{page: 'infoFilm', profile,films: film,current: page, pages: Math.ceil(count[0].dem / perPage) }); 
})
router.get('/:page', async function(req,res){
  var profile= null;
    if(req.session.profile!=null)
    {
      profile=req.session.profile;
    }
  let perPage = 3; // số lượng sản phẩm xuất hiện trên 1 page
  const pagetemp=req.params.page.substr(1, req.params.page.length);
  const page = pagetemp || 1;
  var film = await sequelize.query(`SELECT * FROM films limit ${perPage} OFFSET ${(perPage * page) - perPage}`, { type:Sequelize.QueryTypes.SELECT}); 
  var count = await sequelize.query(`SELECT count(*) as dem FROM films`, { type:Sequelize.QueryTypes.SELECT});
  res.render('catalog1.ejs',{page: 'infoFilm', profile,films: film,current: page, pages: Math.ceil(count[0].dem / perPage) }); 
})

router.post('/',async function(req,res){
  const { tbsearch } = req.body;
  var profile= null;
    if(req.session.profile!=null)
    {
      profile=req.session.profile;
    }
  let perPage = 3; // số lượng sản phẩm xuất hiện trên 1 page
  let page = req.params.page || 1; 
  var film = await sequelize.query(`SELECT * FROM films as f where f."filmName" like N'%`+tbsearch+`%' limit ${perPage} OFFSET  ${(perPage * page) - perPage}`, { type:Sequelize.QueryTypes.SELECT}); 
  var count = await sequelize.query(`SELECT count(*) as dem FROM films as f where f."filmName" like N'%`+tbsearch+`%'`, { type:Sequelize.QueryTypes.SELECT});
  res.render('catalog1.ejs',{page: 'infoFilm', profile,films: film,current: page, pages: Math.ceil(count[0].dem / perPage) }); 
})
module.exports = router;
