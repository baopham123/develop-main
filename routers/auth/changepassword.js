const Router = require("express-promise-router");
const router = new Router();
const Users = require("../../models/user");
const Sequelize = require("sequelize");
const bcrypt = require('bcryptjs');
const sendEmail = require("../../models/email");
const verifyEmail = require("../../models/verifyEmail");
const verifyCode = require("../../models/verifyCode");

router.get('/', async function(req,res){
    var profile= null;
    if(req.session.profile!=null)
    {
      profile=req.session.profile;
    }
    var message=null;
    res.render('changepassword.ejs', {page: 'infoMovie',profile,message }); 
});

router.post('/', async function(req,res){
    var profile= null;
    if(req.session.profile!=null)
    {
      profile=req.session.profile;
    }
    const {oldpassword,newpassword, confirmPassword} = req.body;
    if(newpassword !== confirmPassword)
    {
        var message="error";
        //Báo mật khẩu không trùng khớp
        res.render('changepassword.ejs',{page:"changepassword",profile,message})
    }
    else
    {
        var passwordHash = bcrypt.hashSync(newpassword, bcrypt.genSaltSync(10))
       

        //update password
        await Users.update(
            {
                password: passwordHash,     
            },
            {
                where:{ id: profile.id}
            }
        )
        res.redirect('/auth/signin');
    }
});
router.get('/:id/:code', async function(req,res){

    const userID = req.params.id;
    const code = req.params.code;

    //check exists
    const exitstVerify = await verifyEmail.findOne({
        where:{
            userId: userID,
            verifyCode: code,
            case: 1,
            isUsed: false,
        }
    });

    if(exitstVerify)
    {
        var message=null;
        res.render('changepassword.ejs', {page:"changepassword",type:1,userId: userID,verifyCode: code,message,err:0});
    }
    else{
        res.redirect('/error');
    }
    
});

router.post('/:id/:code', async function(req,res){
    const userID = req.params.id;
    const code = req.params.code;

    const {oldpassword,newpassword, confirmPassword} = req.body;
    if(newpassword !== confirmPassword)
        {
            var message="error";
            //Báo mật khẩu không trùng khớp
            res.render('changepassword.ejs',{page:"changepassword",type:1,userId: userID,verifyCode: code,message,err:1})
        }
        else
        {
            var passwordHash = bcrypt.hashSync(newpassword, bcrypt.genSaltSync(10))
           

            //update password
            await Users.update(
                {
                    password: passwordHash,     
                },
                {
                    where:{ id: userID}
                }
            )

            // mark code used
            await verifyEmail.update(
                { isUsed: true },
                {
                    where: {
                        userId: userID,
                        verifyCode : code,
                        case: 1 
                    }
                }
            );   
            res.redirect('/auth/signin');
        }
});
module.exports = router;