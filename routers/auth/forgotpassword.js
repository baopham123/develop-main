const Router = require("express-promise-router");
const router = new Router();
const Users = require("../../models/user");
const Sequelize = require("sequelize");
const sendEmail = require("../../models/email");
const verifyEmail = require("../../models/verifyEmail");
const verifyCode = require("../../models/verifyCode");

router.get('/', function(req,res){
    res.render("forgotpassword.ejs");
    // if (req.session.profile) {
    //     res.redirect("/personal");
    // } else {
    //     res.render("password/forgetpassword", {page:"forgetpassword"});
    // }
})

router.post('/', async function(req,res){
    userEmail = req.body.Email;
    const exists = await Users.findOne({
        where: {Email: userEmail}
    });

    if(exists)
    {
        const code = verifyCode(8);
        await verifyEmail.create({
            userId: exists.id,
            verifyCode: code,
            //reset password case
            case: 1, 
            isUsed: false 
        });
        await sendEmail(req.body.Email, 'Quên mật khẩu', 'Bạn đã yêu cầu đổi mật khẩu', `<h4>Chào ${exists.profileName}!</h4><p>Bạn đã yêu cầu khôi phục mật khẩu</p><p>Vui lòng click <a href="http://localhost:3000/auth/changepassword/${exists.id}/${code}">vào đây</a> để thay đổi mật khẩu của bạn!</p>`);
        
    }

    res.json({response: "Đã gửi email xác thực."});
})

module.exports = router;