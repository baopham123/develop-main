const Router = require("express-promise-router");
const router = new Router();
const Users = require("../../models/user");
const Sequelize = require("sequelize");
const express = require('express');
const app = express();
 
app.set("view engine", "ejs");
app.set("views", "./views");
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
const bcrypt = require('bcryptjs');
const sequelize=new Sequelize(process.env.DATABASE_URL ||'postgres://postgres:baolerop@localhost:5432/ltweb2');
//const bcrypt = require('bcrypt');

router.get("/", function(req, res) {
  res.render('signinadmin.ejs'); 
});



router.post("/", async function(req, res){
  const { Email, password } = req.body;
  const user = await Users.findOne({
    where: {
      Email: Email
    }
  });
  console.log(user)
  if(!user)
  {
    res.render('signinadmin.ejs'); 
  }
  else
  {
    if(bcrypt.compareSync(password,user.password))
    {
        //check premission of user 
        
        req.session.profile = user;
        var profile= user;

        //sau khi signin redirect lai trang do

        if(user.permission="admin")
        {
          var cinemaGroup =await sequelize.query(`SELECT c."cinemagroupName",SUM(b."Amount") as SumAmount, b."DateCreate"
          FROM "cinemaGroups" as c join movies as m on c.id = m."filmID"
          join bookings as b on m.id = b."movieID"
          group by c.id, b."DateCreate"`, { type:Sequelize.QueryTypes.SELECT}); 
          var film =await sequelize.query(`SELECT f."filmName",SUM(b."Amount") as SumAmount, b."DateCreate"
          FROM films AS f join movies as m on f.id = m."filmID"
          join bookings as b on m.id = b."movieID"
          group by f.id, b."DateCreate"`, { type:Sequelize.QueryTypes.SELECT}); 
          res.render('dashboard.ejs',{page: 'infoCinema', cinemaGroup, film,profile });
        }
    }
    else{
        //Email or password is wrong
        //res.render('auth/signin', {page:"signin",err:1});
        res.render('signinadmin.ejs'); 
    }
  }
  
});

module.exports = router;