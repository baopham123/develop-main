const Router = require('express-promise-router')
const router = new Router();
const Sequelize = require('sequelize')
const Cinema = require("../../models/cinema");
const bcrypt = require('bcryptjs');
const express = require('express');
const { STRING } = require('sequelize');
const app = express();
const sequelize=new Sequelize(process.env.DATABASE_URL ||'postgres://postgres:baolerop@localhost:5432/ltweb2');

router.get('/',async function(req,res){
    var cinema =await sequelize.query(`SELECT * FROM cinemas`, { type:Sequelize.QueryTypes.SELECT}); 
    var cinemaGroup =await sequelize.query(`SELECT * FROM "cinemaGroups"`, { type:Sequelize.QueryTypes.SELECT}); 
    res.render('cinema.ejs',{page: 'infoCinema', cinema,cinemaGroup }); 
})

router.post('/',async function(req,res){
    const {ID,cinemaName,cinemaGroup, cinemaType,cinemaN,cinemaD} = req.body;
    console.log(ID);
    
    if(ID != "")
    {
        await Cinema.update(
            {
                cinemaName: cinemaName,
                cinemagroupID: cinemaGroup,
                cinemaType: cinemaType,
                length: cinemaD,
                width: cinemaN     
            },
            {
                where:{ id: ID}
            }
        )
    }
    else
    {
        await Cinema.create(
            {
                cinemaName: cinemaName,
                cinemagroupID: cinemaGroup,
                cinemaType: cinemaType,
                length: cinemaD,
                width: cinemaN
            }
        )
    }
    res.redirect('/admin/cinema');
})
router.get('/:id',async function(req,res){
    var IDs = req.params.id;
    IDs = IDs.substring(1,IDs.length-1);
    var lstID = IDs.split(',');
    if(lstID != null || lstID != "")
    {
        for(let i = 0; i < lstID.length ; i++ )
        {
            await sequelize.query(`DELETE FROM cinemas WHERE id = '${lstID[i]}'`, { type: Sequelize.QueryTypes.DELETE });
        }
    }
    
    res.redirect('/admin/cinema');
})
module.exports = router;
