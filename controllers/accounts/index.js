const { requiredLogin, requiredAccOwner } = require("../../middlewares/auth");
const router = require("express").Router();

router.get("/",require("./getList"));
router.delete("/:id",require("./deleteAccount"));
router.post("/register", require("./createAccount"));
router.get("/me",requiredLogin, require("./getCurrentAcc"));
router.put("/:id",requiredAccOwner, require("./updateAccount"));
router.put("/changePass/:id",requiredAccOwner, require("./updatePassword"));
router.get("/getAccByEmail", require("./getAccountByEmail"));
router.get("/:id", require("./getAccountById"));

module.exports = { router };
