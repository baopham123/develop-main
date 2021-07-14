const Router = require('express-promise-router');
const router = new Router();
const Sequelize = require("sequelize");
const express = require('express');

router.get('/', async function(req,res){
    req.session.destroy();
    res.redirect('/auth/signin');
})


module.exports = router;