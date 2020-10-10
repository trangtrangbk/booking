const router = require("express").Router();
// const { requiredLogin ,requiredAdmin, checkRole, checkAccountAdmin } = require("../../middlewares/auth");
// const {checkRoleUser,checkRoleAdmin } = require('../../middlewares/role')
router.post("/login", require("./login"));
router.post("/loginAdmin", require("./loginAdmin"));
// router.post("/register",checkRoleAdmin,checkAccountAdmin,require("./register"));
router.get("/auth",require("./auth"));

module.exports = router;
