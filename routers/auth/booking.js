const Router = require('express-promise-router')
const router = new Router();
const Sequelize = require('sequelize')
const Cinema = require("../../models/cinema");
const booking = require("../../models/booking");
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
    var cinema =await sequelize.query(`SELECT * FROM cinemas`, { type:Sequelize.QueryTypes.SELECT}); 
    var film =await sequelize.query(`SELECT * FROM films`, { type:Sequelize.QueryTypes.SELECT}); 
    var movie = await sequelize.query(`SELECT m.id,m."filmID",m."cinemaID",m."DateStart" FROM movies as m`, { type:Sequelize.QueryTypes.SELECT}); 
    res.render('booking.ejs',{page: 'infoCinema', movie,cinema,film, profile }); 
})

router.post('/load',async (req,res)=>{ 
    const {filmID,cinemaID} = req.body;
    var movie1 = await sequelize.query(`SELECT m.id,m."DateStart" FROM movies as m
    where m."filmID"=${filmID} and m."cinemaID" = ${cinemaID}`, { type:Sequelize.QueryTypes.SELECT});
    console.log(movie1);
    res.json(movie1);
})

router.post('/',async function(req,res){
    const {film,cinema,timeStart} = req.body;
    var profile= null;
    if(req.session.profile!=null)
    {
      profile=req.session.profile;
    }
    var movie =await sequelize.query(`SELECT * FROM movies as m
    where m.id=${timeStart}`, { type:Sequelize.QueryTypes.SELECT}); 
    console.log(movie[0].price)
    await booking.create(
    {
        profileID: profile.id,
        movieID: timeStart,
        DateCreate: new Date(),
        Amount: movie[0].price
    });
    
    res.redirect('/auth/history');
})
module.exports = router;
