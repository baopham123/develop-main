const express = require('express');
const Router = require("express-promise-router");
const db = require("./models/dbconnect");
const Sequelize = require("sequelize");
const bodyParser=require("body-parser");
const session = require("express-session");
const redisUrlParse = require('redis-url-parse')
const fileUpload = require('express-fileupload')
const path = require('path')
const RedisStore = require("connect-redis")(session);
const app = express();
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
const REDIS_URL = process.env.REDIS_URL || "redis://@localhost:6379";
const redisOption = redisUrlParse(REDIS_URL);

 
app.set("view engine", "ejs");
app.set("views", "./views");
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
var FileStore = require('session-file-store')(session);

app.use(session({
       store: new FileStore({
        path:"/tmp/sessions",
        secret: process.env.SESSION_SECRET
      }),
       secret: 'keyboard cat'
}));
const sequelize=new Sequelize(process.env.DATABASE_URL ||'postgres://postgres:baolerop@localhost:5432/ltweb2');

app.get('/',async function (req,res) 
{
    var movie =await sequelize.query(`SELECT * FROM films`, { type:Sequelize.QueryTypes.SELECT}); 
    var profile= null;
    if(req.session.profile!=null)
    {
      profile=req.session.profile;
    }
    //info.trailer = info.trailer.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
    res.render('index.ejs', {page: 'infoMovie', movie,profile }); 
})
app.get('/index2',function (req,res)
{
    res.render('index2.ejs'); 
})
app.get('/details1/:ID',async function (req,res) 
{
  var profile= null;
    if(req.session.profile!=null)
    {
      profile=req.session.profile;
    }
    const ID = req.params.ID;
    const id=ID.substr(1, ID.length);
    var movie =await sequelize.query(`SELECT * FROM films AS f where f.id=`+id, { type:Sequelize.QueryTypes.SELECT}); 
    res.render('details1.ejs',{page: 'infoMovie', movie, profile }); 
})

app.use("/auth", require("./routers/auth"));
app.use("/admin", require("./routers/admin"));
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  

const port= process.env.POST || 3000;
db.sync()
.then(function() {
  app.listen(port);
})
.catch(function(err) {
  console.log(err);
});