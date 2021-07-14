const Router = require('express-promise-router')
const router = new Router();
const Sequelize = require('sequelize')
const film = require("../../models/film");
const bcrypt = require('bcryptjs');
const express = require('express');
const { STRING } = require('sequelize');
//const fs = require('fs-extra');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const Buffer = require('buffer/').Buffer;
const fileUpload = require('express-fileupload')
const app = express();
app.use(fileUpload());
const sequelize=new Sequelize(process.env.DATABASE_URL ||'postgres://postgres:baolerop@localhost:5432/ltweb2');

router.get('/',async function(req,res){
    var film =await sequelize.query(`SELECT * FROM films`, { type:Sequelize.QueryTypes.SELECT}); 
    res.render('film.ejs',{page: 'infoCinema', film }); 
})

router.post('/',async function(req,res,next){
    const {ID,filmName,DateShow,poster,files,time,Description,Trailer} = req.body;
    if(files != null || files != "")
    {
        var matches =files.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        response = {};
        
        if (matches.length !== 3) {
        return new Error('Invalid input string');
        }
        
        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        let extension = mime.getExtension(type);
        let fileName = poster;
        try {
        fs.writeFileSync("./public/img/covers/" + fileName, imageBuffer, 'utf8');
        } catch (e) {
        next(e);
        }
    }
    if(ID != "")
    {
        await film.update(
            {
                filmName: filmName,
                DateShow: DateShow,
                poster: poster,
                time: time,
                Description: Description,
                Trailer: Trailer   
            },
            {
                where:{ id: ID}
            }
        )
    }
    else
    {
        await film.create(
            {
                filmName: filmName,
                DateShow: DateShow,
                poster: poster,
                time: time,
                Description: Description,
                Trailer: Trailer
            }
        )
    }
    res.redirect('/admin/film');
})
router.get('/:id',async function(req,res){
    var IDs = req.params.id;
    IDs = IDs.substring(1,IDs.length-1);
    var lstID = IDs.split(',');
    if(lstID != null || lstID != "")
    {
        for(let i = 0; i < lstID.length ; i++ )
        {
            await sequelize.query(`DELETE FROM films WHERE id = '${lstID[i]}'`, { type: Sequelize.QueryTypes.DELETE });
        }
    }
    
    res.redirect('/admin/film');
})
module.exports = router;
