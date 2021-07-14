const Router = require('express-promise-router')
const router = new Router();
const Sequelize = require('sequelize')
const Users = require("../../models/user");
const bcrypt = require('bcryptjs');
const express = require('express');


const sendEmail = require('../../models/email');
const verifyEmail = require('../../models/verifyEmail');
//get verify code by random string 
const verifyCode = require('../../models/verifyCode');
router.get('/', function(req,res){
    var profile= null;
    if(req.session.profile!=null)
    {
      profile=req.session.profile;
    }
    res.render('personal.ejs', {page: 'infoMovie',profile }); 
})

router.post('/',async function(req,res){
    const {profileName,Email,phone} = req.body;
    var profile= null;
    if(req.session.profile!=null)
    {
      profile=req.session.profile;
    }
    //update password
    await Users.update(
        {
            profileName: profileName,
            phone: phone

        },
        {
            where:{ id: profile.id}
        }
    )
    const user = await Users.findOne({
        where: {
          Email: Email
        }
    });
    profile = await Users.findOne({
        attributes: ['id','Email', 'profileName', 'phone' ,'permission'],
        where: {
          id: user.id
        }
    });
     
      
    req.session.profile = profile;
    res.render('personal.ejs', {page: 'infoMovie',profile }); 
    
})
module.exports = router;