const { requiredLogin, requiredAccOwner } = require("../../middlewares/auth");
const router = require("express").Router();

router.get("/",require("./getList"));
router.delete("/:id",require("./deleteAdmin"));
router.post("/", require("./createAdmin"));
router.get("/me",requiredLogin, require("./getCurrentAdmin"));
router.put("/:id", require("./updateAdmin"));
router.put("/changePass/:id",requiredAccOwner, require("./updatePassword"));
// router.get("/getAccByEmail", require("./getAdminByEmail"));
router.get("/:id", require("./getAdminById"));
 
module.exports = { router };
