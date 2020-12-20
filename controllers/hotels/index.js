const router = require("express").Router();
const { requiredLogin,requiredHotelOwner } = require("../../middlewares/auth");

router.get("/available",require("./getAvailableList"));
router.get("/",require("./getList"));
router.delete("/:id",requiredLogin,requiredHotelOwner,require("./deleteHotel"));
router.post("/",requiredLogin, require("./createHotel"));
router.get("/:id", require("./getHotelById"));
router.put("/:id",requiredLogin,requiredHotelOwner, require("./updateHotel"));

module.exports = { router };
