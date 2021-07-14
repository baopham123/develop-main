const Router = require('express-promise-router')
const router = new Router();

router.use("/signin", require("./auth/signin"));
router.use("/signup", require("./auth/signup"));
router.use("/logout", require("./auth/logout"));
router.use("/personal", require("./auth/personal"));
router.use("/forgotpassword", require("./auth/forgotpassword"));
router.use("/changepassword", require("./auth/changepassword"));
router.use("/booking", require("./auth/booking"));
router.use("/history", require("./auth/history"));
router.use("/catalog1", require("./auth/catalog1"));
module.exports = router;
