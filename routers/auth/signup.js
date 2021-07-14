const Router = require('express-promise-router')
const router = new Router();
const Sequelize = require('sequelize')
const Users = require("../../models/user");
const bcrypt = require('bcryptjs');
const express = require('express');


// const generateUUID = require('../../models/generateUUID');
const sendEmail = require('../../models/email');
const verifyEmail = require('../../models/verifyEmail');
//get verify code by random string 
const verifyCode = require('../../models/verifyCode');
router.get('/', function(req,res){
    res.render('signup.ejs'); 
})

router.post('/',async function(req,res){
    const {profileName,Email, password,confirmPassword} = req.body;
    const isExits = await Users.findOne({
            where: {
                Email: Email
            }
        }
    );
    
    if(isExits)
    {
        console.log('1')
        //Email đã được sử dụng
        res.render('signup.ejs',{page:"signup",err:1})
    }
    else{
        if(password !== confirmPassword)
        {
            console.log('2')
            //Báo mật khẩu không trùng khớp
            res.render('signup.ejs',{page:"signup",err:2})
        }
        else
        {
            console.log('3')
            var passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
           

            //Tạo mới user đánh dấu là chưa xác thực
            await Users.create(
                {
                    Email: Email,
                    password: passwordHash,
                    profileName: profileName,
                    phone: "000",
                    permission: "personal",
                    status: false,
                }
            )
            
            const userCreated = await Users.findOne(
                {
                    where: { Email : Email }
                }
            )

            const code = verifyCode(8);
            console.log(userCreated.id);
            await verifyEmail.create(
                {
                    userId: userCreated.id,
                    verifyCode: code,
                    //signup case
                    case: 0, 
                    isUsed: false 
                }
            )
            
            const html = `<h4>Chào ${profileName}!</h4><p>Bạn đã sử dụng email này để đăng ký tài khoản trên Cinema</p><p>Vui lòng click vào link bên dưới để xác thực tài khoản email trước khi đăng nhập</p><a href="http://localhost:3000/auth/signup/verify/${userCreated.id}/${code}">Xác thực tài khoản</a>`;

            //Gửi email xác thực đến email dùng để đăng kí
            await sendEmail(Email, 'Xác thực tài khoản email', 'Bạn đã dùng email này để đăng ký tài khoản trên Cinema', html);
            //redirect toi trang thong bao da gui xac thuc toi email
            console.log(Email)
            res.render('signin.ejs');
        }
    }
})


 
router.get('/verify/:id/:code', async function(req,res){
    const userID = req.params.id;
    const code = req.params.code;
    //check exists
    const exitstVerify = await verifyEmail.findOne({
        where: {
            userId : userID,
            verifyCode : code,
            case: 0,
            isUsed : false
        }
    });

    if(!exitstVerify)
    {
        res.redirect('/error');
    }
    else
    {
        //mark verified user
        Users.update(
            { status:true },
            {
                where:{
                    id : userID
                }
            }
        );
        
        //mark verify code used
        verifyEmail.update(
            {
                isUsed: true
            },
            {
                where:{
                    id: exitstVerify.id
                }
            }
        )
        res.redirect('/auth/signin');
    }
   
    
    
});

module.exports = router;