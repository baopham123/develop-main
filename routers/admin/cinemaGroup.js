const Router = require('express-promise-router')
const router = new Router();
const Sequelize = require('sequelize')
const cinemaGroup = require("../../models/cinemaGroup");
const bcrypt = require('bcryptjs');
const express = require('express');
const { STRING } = require('sequelize');
const sequelize=new Sequelize(process.env.DATABASE_URL ||'postgres://postgres:baolerop@localhost:5432/ltweb2');

router.get('/',async function(req,res){
    var cinemaGroup =await sequelize.query(`SELECT * FROM "cinemaGroups"`, { type:Sequelize.QueryTypes.SELECT}); 
    res.render('cinemaGroup.ejs',{page: 'infoCinema', cinemaGroup }); 
})

router.post('/',async function(req,res){
    const {ID,cinemagroupName,Address} = req.body;
    console.log(ID);
    
    if(ID != "")
    {

        await cinemaGroup.update(
            {
                cinemagroupName: cinemagroupName,
                Address: Address
            },
            {
                where:{ id: ID}
            }
        )
    }
    else
    {
        await cinemaGroup.create(
            {
                cinemagroupName: cinemagroupName,
                Address: Address
            }
        )
    }
    res.redirect('/admin/cinemaGroup');
})
router.get('/:id',async function(req,res){
    var IDs = req.params.id;
    IDs = IDs.substring(1,IDs.length-1);
    var lstID = IDs.split(',');
    if(lstID != null || lstID != "")
    {
        for(let i = 0; i < lstID.length ; i++ )
        {
            await sequelize.query(`DELETE FROM "cinemaGroups" WHERE id = '${lstID[i]}'`, { type: Sequelize.QueryTypes.DELETE });
        }
    }
    
    res.redirect('/admin/cinemaGroup');
})
module.exports = router;
