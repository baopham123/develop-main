const Router = require('express-promise-router')
const router = new Router();

router.use("/cinema", require("./admin/cinema"));
router.use("/cinemaGroup", require("./admin/cinemaGroup"));
router.use("/movie", require("./admin/movie"));
router.use("/film", require("./admin/film"));
router.use("/dashboard", require("./admin/dashboard"));
router.use("/signinadmin", require("./admin/signinadmin"));
router.use("/logoutadmin", require("./admin/logoutadmin"));

module.exports = router;
